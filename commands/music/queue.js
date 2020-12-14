
const {  MessageEmbed, escapeMarkdown } = require("discord.js");
const utils = require('../../utils')
module.exports = {
    name: 'queue',
    aliases: ['playlist'],
    description: 'Display the song queue.',
	guildOnly : true,
    args: false,
    group: 'Music',

    execute(message) {
        const queue = message.client.musicQueue.get(message.guild.id)
        if(!queue) 
            return message.reply(`There is no music currently playing.`)
        
        if(!queue.songs.length) {
            return queue.textChannel.send(`**Queue is empty.**`)
        }

        const description = queue.songs.map((song, index) => `${index + 1}. **${escapeMarkdown(song.title)}**\n \`Added by\` ${song.addedBy} 
        \`Duration\` ${utils.convertSecondsToMins(song.duration)}`);

        let embed = new MessageEmbed()
        embed.setTitle(`**MUSIC QUEUE - ${message.guild.name}**\n`)
        embed.setColor('#6aa9ff')
        embed.setDescription(description)
        embed.attachFiles(['./assets/music.png'])
        embed.setThumbnail('attachment://music.png')

        return message.channel.send(embed)  
    }
}