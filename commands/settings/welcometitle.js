const utils = require('../../utils')
const { defaultWelcomeTitle } = require('../../config.json')

module.exports = {
    name: 'welcometitle',
    aliases: ['set-welcome-title'],
    description: 'Changes the welcome message\'s title. Pass \'default\' as argument to reset it to default. Pass \'show\' to see the one currently in use.',
	guildOnly : true,
    args: true,
    group: 'Settings',
    needsPermissions: ['Manage server'],
    usage: '<welcome message title>',

    async execute(message, args) {
        if(!message.member.hasPermission('MANAGE_GUILD'))
            return message.reply(`You do not have the permission(s) to execute this command.`)
        
        var welcomeTitle = utils.arrayToString(args)
        if(welcomeTitle === 'default')
            welcomeTitle = defaultWelcomeTitle

        if(welcomeTitle === 'show') {
            const server = message.client.serversCache.find(cacheItem => cacheItem.serverID === message.member.guild.id)
            return message.reply(`**Current message:** ${server.welcomeMessageTitle}`)
        }    
        Servers.updateOne({serverID: message.member.guild.id}, {$set: {welcomeMessageTitle: welcomeTitle}}, function(err, res) {
            if(err)
                console.log(err)
            return message.reply(`Welcome message title updated.`)
        })  
    }
}