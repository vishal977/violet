const utils = require('../../utils')

module.exports = {
    name: 'defaultroles',
    aliases: ['roles', 'welcomeroles'],
    description: 'Show/Add/Remove/Remove all word(s) from the default roles list.',
	guildOnly : true,
    args: true,
    group: 'Settings',
    needsPermissions: ['Manage roles'],
    usage: '<add/remove/removeall/show> <role(s)>',

    async execute(message,args) {
        if(!message.member.hasPermission('MANAGE_ROLES'))
            return message.reply(`You do not have the permission(s) to execute this command.`)
        
        const operation = args.shift().toLowerCase()
        const server = message.client.serversCache.find(cacheItem => cacheItem.serverID === message.member.guild.id)
        var defaultRolesArray = server.defaultRoles

        if(operation === 'add') {
            for(let word of args) {
                if(!utils.isARole(word, message.member.guild))
                    return message.reply(`${word} is not a role in this server.`)
                if(!defaultRolesArray.includes(word)) {
                    defaultRolesArray.push(word)
                }
            }

            Servers.updateOne({serverID: message.member.guild.id}, {$set: {defaultRoles: defaultRolesArray}}, function(err, res) {
                if(err)
                    console.log(err)
                return message.reply(`Default roles updated`)
            })

        }
        else if(operation === 'remove') {
            for(let role of args) {
                defaultRolesArray = defaultRolesArray.filter((w) => w != role);
            }

            Servers.updateOne({serverID: message.member.guild.id}, {$set: {defaultRoles: defaultRolesArray}}, function(err, res) {
                if(err)
                    console.log(err)
                return message.reply(`Default roles updated`)
            })
        }
        else if(operation === 'clear') {
            Servers.updateOne({serverID: message.member.guild.id}, {$set: {defaultRoles: []}}, function(err, res) {
                if(err)
                    console.log(err)
                return message.reply(`Removed all default member roles.`)
            })
        }
        else if(operation === 'show') {
            if(!defaultRolesArray.length)
                return message.reply(`There are no default roles configured.`)
            return message.reply(`Default roles: ${defaultRolesArray.join(', ')}`)
        }
        else {
            return message.reply(`Please mention one among the following as the operation: SHOW, ADD, REMOVE OR CLEAR`)
        }
    }
}