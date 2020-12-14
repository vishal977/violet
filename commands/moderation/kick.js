const utils = require('../../utils')

module.exports = {
    name: 'kick',
    aliases: ['remove','boot'],
    description: 'Kicks the mentioned user from the server.',
	guildOnly : true,
    args: true,
    group: 'Moderation',
    needsPermissions: ['Kick Members'],
    usage: '<user> [reason]',
    
	execute(message, args) {
        var user = message.mentions.members.first();
        args.shift()
        var kickReason = args.length ? utils.arrayToString(args) : 'None'

        if(!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply(`You do not have the permission to execute this command.`)
        
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) 
            return message.reply(`I do not have permissions to kick users from this server.`)
        
        if(utils.mentionedUserIsSelf(user))
        return message.reply(`Seriously? :face_with_raised_eyebrow:`)
        
        if(!message.member.manageable)
            return message.reply(`The mentioned user has the same role as mine or higher. I cannot kick them.`)
        
        if(utils.mentionedUserIsSelf(user))
        return message.reply(`Seriously? :face_with_raised_eyebrow:`)
        
        user.kick(kickReason).then(kickedUser => {
            console.log(`After kick`)
            return message.channel.send(`${kickedUser.user} was just kicked out of the server`)
        }).catch( err => {
            return message.channel.send(`Could not kick the user. They have the same role as mine or higher.`)
        }) 
	}
}