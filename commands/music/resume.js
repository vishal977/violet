module.exports = {
    name: 'resume',
    aliases: ['unpause'],
    description: 'Resumes the player',
	guildOnly : true,
    args: false,
    group: 'Music',

    execute(message) {
        const queue = message.client.musicQueue.get(message.guild.id)
        if(!queue) 
            return message.reply(`**There is no music currently playing.**`)
        if(!queue.playing) {
            queue.playing = true;
            queue.connection.dispatcher.resume()
            return queue.textChannel.send(`:arrow_forward: **Player resumed**`)
        }
        else {
            return queue.textChannel.send(`**Player is not paused.**`)
        }
    }

}