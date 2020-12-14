module.exports = {
    name: 'leave',
    description: 'Leave the voice channel. Discards the music queue.',
	guildOnly : true,
    args: false,
    group: 'Music',

    execute(message) {
        const voiceChannel = message.member.voice.channel;
        
        if(!voiceChannel) {
            return message.channel.send(`You need to be in a voice channel first.`)
        }

        const myVoiceChannel = message.guild.me.voice.channel
        if(!myVoiceChannel)
            return message.channel.send(`I am currently not in a voice channel.`)
        
        message.client.musicQueue.delete(message.guild.id)
        return myVoiceChannel.leave()
    }

}