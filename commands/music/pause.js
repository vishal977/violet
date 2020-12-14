module.exports = {
    name: 'pause',
    aliases: ['hold'],
    description: 'Pause the player',
	guildOnly : true,
    args: false,
    group: 'Music',

    execute(message) {
        const queue = message.client.musicQueue.get(message.guild.id)
        if(!queue) 
            return message.reply(`**There is no music currently playing.**`)
        if(queue.playing) {
            queue.playing = false;
            queue.connection.dispatcher.pause(true)
            return queue.textChannel.send(`:pause_button: **Music paused**`)
        }
        else {
            return queue.textChannel.send(`:pause_button: **The player is already paused.**`)
        }
    }

}