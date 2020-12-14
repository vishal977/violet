module.exports = {
    name: 'cleanup',
    aliases: ['bulkdelete'],
    description: 'Deletes specified number of recent messages from the channel',
	guildOnly : true,
    args: true,
    group: 'Moderation',
    needsPermissions: ['Manage Channels'],
    usage: '<no-of-messages>',

    execute(message, args) {
        
        if(isNaN(args[0]) || args[0] < 2 || args[0] > 100)
            return message.channel.send(`The no. of messages should be a number between 2 and 100`)

        if(!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply(`You do not have the permission to execute this command.`)
        
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) 
            return message.reply(`I do not have permissions manage channels.`)

        message.channel.bulkDelete(args[0], true)
        .then(messages => { message.channel.send(`${messages.size} recent messages deleted.`) })
        .catch(err => { console.log(err) })
    }
}