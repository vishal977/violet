const utils = require('../../utils')

module.exports = {
    name: 'ban',
    description: 'Bans the mentioned user from the server. Deletes (0-7) days of messages if specified.',
	guildOnly : true,
    args: true,
    group: 'Moderation',
    needsPermissions: ['Ban Members'],
    usage: '<user> [no-of-days-of-msgs-to-delete] [reason]',
    
	execute(message, args) {
        var user = message.mentions.members.first();
        args.shift()
        const cleanUpDays = args.shift()
        if(cleanUpDays > 7) cleanUpDays = 7
        if(cleanUpDays < 0) cleanUpDays = 0
        var banReason = utils.arrayToString(args)
        if(!banReason) banReason = ''
        
        if(!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply(`You do not have the permission(s) to execute this command.`)
        
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) 
        return message.reply(`I do not have permissions to ban users from this server.`)
        
        if(utils.mentionedUserIsSelf(user))
            return message.reply(`Seriously? :face_with_raised_eyebrow:`)
        
        if(!message.member.manageable)
            return message.reply(`The mentioned user has the same role as mine or higher. I cannot ban them.`)

        user.ban({days: cleanUpDays, reason: banReason})
        
        message.channel.send(`${user} has been banned from the server. ${cleanUpDays} days' worth of their messages have been deleted.`)
	}
}