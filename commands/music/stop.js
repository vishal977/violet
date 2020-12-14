module.exports = {
    name: 'stop',
    aliases: ['end'],
    description: 'Stops playing music',
	guildOnly : true,
    args: false,
    group: 'Music',

    execute(message) {
        const queue = message.client.musicQueue.get(message.guild.id)
        if(!queue) 
            return message.reply(`**There is no music currently playing.**`)
        
        queue.songs = []
        queue.connection.dispatcher.end()
        return queue.textChannel.send(`**Player stopped.** :octagonal_sign:`)
    }
}