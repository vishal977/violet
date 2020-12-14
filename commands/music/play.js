const ytdl = require('ytdl-core')
const utils = require('../../utils')
const { youtubeapikey2 } = require('../../config.json')
const YouTubeAPI = require("simple-youtube-api")
const youtube = new YouTubeAPI(youtubeapikey2)
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'play',
    aliases: ['add'],
    description: 'Plays the song or adds it to the queue.',
	guildOnly : true,
    args: true,
    group: 'Music',
    usage: '<youtube URL> or <Video Name>',

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) 
            return message.reply(`You need to be in a voice channel first.`)
        
        const serverMusicQueue = message.client.musicQueue.get(message.member.guild.id)

        if(serverMusicQueue && voiceChannel !== message.guild.me.voice.channel)
            return message.reply(`I am already playing music in a voice channel. You need to be in the same channel as me.`)

        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has("CONNECT"))
            return message.reply(`I am not allowed to connect to this voice channel.`)
        if(!permissions.has("SPEAK"))
            return message.reply(`I am not allowed to speak in this voice channel.`)

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel,
            connection: null,
            songs: [],
            volume: 50,
            playing: true
        }

        let song = null;
        let songInfo = null;
        if(utils.isYoutubeURL(args[0])) {
            try {
                message.channel.send(`**Loading song from URL** :hourglass: \`${args[0]}\``)
                songInfo = await ytdl.getInfo(args[0]);
                song = {
                  title: songInfo.videoDetails.title,
                  url: songInfo.videoDetails.video_url,
                  duration: songInfo.videoDetails.lengthSeconds,
                  addedBy: message.member.user,
                  thumbnail: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url
                };
              } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
             }
        }
        else {
            try {
                const searchTerm = utils.arrayToString(args)
                message.channel.send(`**Searching** :mag_right: \`${searchTerm}\``).catch(console.err)
                const results = await youtube.searchVideos(searchTerm, 1);
                songInfo = await ytdl.getInfo(results[0].url);
                song = {
                  title: songInfo.videoDetails.title,
                  url: songInfo.videoDetails.video_url,
                  duration: songInfo.videoDetails.lengthSeconds,
                  addedBy: message.member.user,
                  thumbnail: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                  channel: songInfo.videoDetails.ownerChannelName
                };
              } catch (error) {
                console.log(error);
                return message.reply("No video was found with a matching title").catch(console.error);
              }
        }

        if(serverMusicQueue) {
            serverMusicQueue.songs.push(song)
            let embed = new MessageEmbed()
            const avatar = song.addedBy.displayAvatarURL()
            const songDuration = utils.convertSecondsToMins(song.duration)
            embed.setAuthor(`Added to the queue`, `${avatar}`)
            embed.setTitle(`${song.title}`)
            embed.setURL(`${song.url}`)
            embed.addField(`Channel`, `${song.channel}`,true)
            embed.addField(`Song duration`, `${songDuration}`,true)
            embed.setThumbnail(`${song.thumbnail}`)
            embed.setColor('#6aa9ff')

            return serverMusicQueue.textChannel.send(embed)
            .catch(console.error)
        }
        queueConstruct.songs.push(song)
        message.client.musicQueue.set(message.guild.id, queueConstruct)
        queueConstruct.textChannel.send(`**Playing** \`${song.title}\` :notes:`).catch(console.err)

        try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message, queueConstruct.songs[0])
        }
        catch(err) {
            console.log(err)
            return message.channel.send(err)
        }

        function play(message, song) {
            const serverMusicQueue = message.client.musicQueue.get(message.guild.id)
            if(!song) {
                serverMusicQueue.voiceChannel.leave()
                message.client.musicQueue.delete(message.guild.id)
                return
            }

            const dispatcher = serverMusicQueue.connection.play(ytdl(song.url))
            dispatcher.on('finish', () => {
                serverMusicQueue.songs.shift()
                play(message, serverMusicQueue.songs[0])
            })

            dispatcher.on('error', (err) => {
                console.log(err)
            })
        }
    }
}