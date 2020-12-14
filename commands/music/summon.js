module.exports = {
    name: 'summon',
    description: 'Summon the bot to the voice channel you are in',
    aliases: ['join'],
	guildOnly : true,
    args: false,
    group: 'Music',

    execute(message) {
        const voiceChannel = message.member.voice.channel;
        
        if(!voiceChannel) {
            return queue.textChannel.send(`You need to be in a voice channel first.`)
        }
        else {
            voiceChannel.join()
            return message.channel.send(`Joined.`)
        }
        
    }

}