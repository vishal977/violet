const utils = require('../../utils')
const { defaultWelcomeBody } = require('../../config.json')

module.exports = {
    name: 'welcomebody',
    aliases: ['set-welcome-body'],
    description: 'Change welcome message\'s body. --user-- mentions the user. Pass \'default\' as argument to reset it to default. Pass \'show\' to see the message currently in use',
	guildOnly : true,
    args: true,
    group: 'Settings',
    needsPermissions: ['Manage server'],
    usage: '<welcome message body>',

    async execute(message, args) {
        if(!message.member.hasPermission('MANAGE_GUILD'))
            return message.reply(`You do not have the permission(s) to execute this command.`)
        
        var welcomeBody = utils.arrayToString(args)
        if(welcomeBody === 'default') {
            welcomeBody = defaultWelcomeBody
        }

        if(welcomeBody === 'show') {
            const server = message.client.serversCache.find(cacheItem => cacheItem.serverID === message.member.guild.id)
            return message.reply(`**Current message:** ${server.welcomeMessageBody}`)
        }
        
        Servers.updateOne({serverID: message.member.guild.id}, {$set: {welcomeMessageBody: welcomeBody}}, function(err, res) {
            if(err)
                console.log(err)
            return message.reply(`Welcome message body updated.`)
        })  
    }
}