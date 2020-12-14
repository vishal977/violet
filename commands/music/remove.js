module.exports = {
    name: 'remove',
    aliases: ['delete', 'dequeue'],
    description: 'Removes the song at the specified position.',
	guildOnly : true,
    args: true,
    group: 'Music',
    usage: '<position> or all',

    execute(message, args) {
        const queue = message.client.musicQueue.get(message.guild.id)
        if(!queue) 
            return message.reply(`**There is no music currently playing.**`)
        
        const argument = args[0].toLowerCase()
        if(argument === 'all'){
            queue.songs = []
            return queue.textChannel.send(`**Song queue cleared.** :regional_indicator_x:`)
        }
        const song = queue.songs.splice(args[0] - 1, 1);
        return queue.textChannel.send(`\`${song[0].title}\` **has been removed from the queue.** :regional_indicator_x:`)

    }

}