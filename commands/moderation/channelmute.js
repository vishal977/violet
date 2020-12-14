module.exports = {
    name: 'channelmute',
    aliases: ['ma'],
    description: 'Mute or Unmute all users in the voice channel. Do not specify ON or OFF to toggle mute for everyone',
	guildOnly : true,
    args: false,
    group: 'Moderation',
    needsPermissions: ['Mute Members'],
    usage: '<on/off>',

    async execute(message, args) {
        if(!message.member.hasPermission('MUTE_MEMBERS'))
            return message.reply(`You do not have the permission(s) to execute this command.`)
        
        var toggle = args.length ? args[0] : ''
        const voiceChannel = message.member.voice.channel
        const voiceChannelMembers = voiceChannel.members
        if(toggle === '') {
            if(!voiceChannel) 
                return message.reply(`You need to be in a voice channel to use this command.`)
            
            for(let voiceChannelMember of voiceChannelMembers) {
                var serverMuteStatus = voiceChannelMember[1].voice.serverMute
                voiceChannelMember[1].voice.setMute(!serverMuteStatus)
            }
        }
        else if(toggle === 'on') {
            for(let voiceChannelMember of voiceChannelMembers) {
                voiceChannelMember[1].voice.setMute(true)
            }
        }
        else if(toggle === 'off') {
            for(let voiceChannelMember of voiceChannelMembers) {
                voiceChannelMember[1].voice.setMute(false)
            }
        }
        else {
            return message.reply(`Please specify either 'ON' or 'OFF' as an argument.`)
        }

        message.delete({timeout: 2000})
    }
}