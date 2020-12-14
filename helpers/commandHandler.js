const { prefix } = require('../config.json')
module.exports = function(message) {

    const args = message.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase()
    /* Dynamic command handler. */
    var comm
    let groups = Array.from(message.client.commands.keys());
    for(let group of groups) {
        var commandsInTheGroup = Array.from(message.client.commands.get(group))
        for(let commandInGroup of commandsInTheGroup) {
           if(commandInGroup.name === command || (commandInGroup.aliases && commandInGroup.aliases.includes(command)))
            comm = commandInGroup
        }

    }

    if(!comm) {
        return message.reply(`Please enter a valid command.`)
    }

    if (comm.guildOnly && message.channel.type === 'dm') {
        return message.reply(`This command cannot be executed via Direct Messages. Sorry`);
    }
    

    if(comm.args && !args.length) {
        let reply = `${message.author}, You did not provide any arguments.`
        if(comm.usage) 
            reply += `\n Tip: \`${prefix}${comm.name} ${comm.usage}\``
        return message.channel.send(reply)
    }

    try { 
        comm.execute(message,args)
    }
    catch(error) {
        console.log(`Error handling the command - ${command} : ${error}`)
        return message.channel.send(`There was an error while trying to execute the command.`)
    }
}