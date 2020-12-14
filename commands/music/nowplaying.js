const utils = require('../../utils')
const {  MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'currentsong'],
    description: 'Display the currently playing song.',
	guildOnly : true,
    args: false,
    group: 'Music',

    execute(message) {
        const queue = message.client.musicQueue.get(message.guild.id)
        if(!queue) 
            return message.reply(`**There is no music currently playing.**`)
        
        const song = queue.songs[0]
        if(!song) {
            return queue.textChannel.send(`**Looks like the queue was cleared. Song info unavailable.**`)
        }
        const songDuration = utils.convertSecondsToMins(song.duration)
        let embed = new MessageEmbed()
        embed.setTitle(`Currently playing`)
        embed.setURL(`${song.url}`)
        embed.addField(`Song`, `${song.title}`,true)
        embed.addField(`Channel`, `${song.channel}`,true)
        embed.addField(`Total Duration`, `${songDuration}`,false)
        embed.setThumbnail(`${song.thumbnail}`)
        embed.setColor('#6aa9ff')

        return queue.textChannel.send(embed).catch(console.err)
    }

}