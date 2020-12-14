module.exports = {
    name: 'greetings',
    aliases: ['setgreetings', 'greeting'],
    description: 'See if new member greetings are ON or OFF. Specify ON or OFF to change.',
	guildOnly : true,
    args: false,
    group: 'Settings',
    needsPermissions: ['Manage server'],
    usage: '[on/off]',
    
    async execute(message,args) {

        
        if(!message.member.hasPermission('MANAGE_GUILD'))
            return message.reply(`You do not have the permission(s) to execute this command.`)

        if(!args.length) {
            const server = message.client.serversCache.find(cacheItem => cacheItem.serverID === message.member.guild.id)
            if(!server) return message.reply(`Error fetching server details. Please try again later.`)
            const reply = server.isGreetingAllowed ? `Greetings are enabled.` : `Greetings are disabled.`
            return message.channel.send(reply)
        }
        else {
            const value = args[0].toLowerCase()
            if(value === 'on' || value === 'off') {
                var reply
                var flag
                if(value === 'on') { 
                    flag = true
                    reply = `Greetings are now enabled.`
                }
                else { 
                    flag = false
                    reply = `Greetings are now disabled.`
                }

                Servers.updateOne({serverID: message.member.guild.id}, {$set: {isGreetingAllowed: flag}}, function(err, res) {
                    if(err)
                        console.log(err)
                    return message.reply(reply)
                })   
            }
            else {
                message.reply(`The argument can either be 'on' or 'off'.`)
            }
        }
    }
}