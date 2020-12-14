module.exports = {
    name: 'slowmode',
    aliases: ['ratelimit'],
    description: 'Enable/disable slowmode for the channel. Setting interval to 0 disables slowmode.',
	guildOnly : true,
    args: true,
    group: 'Moderation',
    needsPermissions: ['Manage Channels'],
    usage: '<time in seconds>',

    execute(message, args) {
        
        if(isNaN(args[0]) || args[0] > 21600)
            return message.channel.send(`The time interval should be a number between 0 and 21600`)

        if(!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply(`You do not have the permission to execute this command.`)
        
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) 
            return message.reply(`I do not have permissions manage channels.`)

        message.channel.setRateLimitPerUser(Math.abs(args[0]))
        .then(textChannel => {
            if(args[0] > 0)
                return message.channel.send(`**${textChannel.name} is now in slowmode.** Interval: ${args[0]} seconds.`)
            else 
                return message.channel.send(`**Slowmode disabled.**`)
        }).catch(err => { console.log(err )})
    }
}