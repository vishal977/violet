module.exports = {
    name: 'blacklist',
    description: 'Show/Add/Remove/Remove all word(s) from the blacklist.',
	guildOnly : true,
    args: true,
    group: 'Moderation',
    needsPermissions: ['Manage server'],
    usage: '<add/remove/removeall/show> <word(s)>',
    
    async execute(message,args) {
        if(!message.member.hasPermission('MANAGE_GUILD'))
            return message.reply(`You do not have the permission to execute this command.`)
        
        const operation = args.shift().toLowerCase()

        const serverDetails = message.client.serversCache.find(cacheItem => cacheItem.serverID === message.member.guild.id)
        var blacklistArray = serverDetails.blackList
        

        if(operation === 'add') {
            for(let word of args) {
                word = word.toLowerCase()
                if(!blacklistArray.includes(word)) {
                    blacklistArray.push(word)
                }
            }

            Servers.updateOne({serverID: message.member.guild.id}, {$set: {blackList: blacklistArray}}, function(err, res) {
                if(err) 
                    return message.reply(`Error updating the Blacklist.`)
                return message.reply(`Blacklist updated.`)
            })
        }
        else if(operation === 'remove') {
            for(let word of args) {
                blacklistArray = blacklistArray.filter((w) => w != word);
            }

            Servers.updateOne({serverID: message.member.guild.id}, {$set: {blackList: blacklistArray}}, function(err, res) {
                if(err) 
                    return message.reply(`Error updating the Blacklist.`)
                return message.reply(`Blacklist updated.`)
            })
        }
        else if(operation === 'clear') {
            Servers.updateOne({serverID: message.member.guild.id}, {$set: {blackList: []}}, function(err, res) {
                if(err) 
                    return message.reply(`Error updating the Blacklist.`)
                return message.reply(`Blacklist updated.`)
            })
        }
        else if(operation === 'show') {
            if(!blacklistArray.length)
                return message.reply(`There are no blacklisted words right now.`)
            return message.reply(`Blacklisted words: ${blacklistArray.join(', ')}`)
        }
        else {
            return message.reply(`Please mention one among the following as the operation: SHOW, ADD, REMOVE OR CLEAR`)
        }
    
    }
}