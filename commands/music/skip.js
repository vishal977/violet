module.exports = {
    name: 'skip',
    aliases: ['next'],
    description: 'Skips the currently playing song',
	guildOnly : true,
    args: false,
    group: 'Music',

    execute(message) {
        const queue = message.client.musicQueue.get(message.guild.id)
        if(!queue) 
            return message.reply(`**There is no music currently playing.**`)
        
        queue.playing = true
        queue.connection.dispatcher.end()
        queue.textChannel.send(`Skipped! :fast_forward:`).catch(console.err)
    }
}