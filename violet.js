/* Library and resource imports. */
const Discord = require('discord.js')
const connectToDatabase = require('./helpers/connectToDatabase')
const eventHandlers = require('./helpers/eventHandlers')
const commandHandler = require('./helpers/commandHandler')
const { messageMonitor } = require('./helpers/messageMonitor')
const fs = require('fs')
const path = require('path')
const { prefix, token } = require('./config.json')

/* Creating new Discord client object and logging in.*/
const client = new Discord.Client()
client.login(token)

/* Global object to store connection to the 'servers' collection */
global.Servers

/* Cache variable to store server details locally. Refreshes every time databse is updated.*/
client.serversCache

/* Function to refresh the cache whenever database is updated.*/ 
client.refreshServersCache = function refreshServersCache() { 
    Servers.find({}).toArray(function(err, data) {
        if(err)
            console.log(`Error refreshing serversCache.`)
        client.serversCache = data
    })
}

/* Collection to store list of commands and groups */
client.commands = new Discord.Collection()
client.musicQueue = new Map()

/*Helper function. Gets all sub-directories inside the mentioned directory.*/ 
const getDirectories = (srcPath) => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())

/* Load all available commands into the commands collection. */
const commandGroups = getDirectories('./commands')
for(let commandGrp of commandGroups) { 
    const commands = fs.readdirSync(`./commands/${commandGrp}`).filter(commandFile => commandFile.endsWith('.js'));
    for(const file of commands) {
        const command = require(`./commands/${commandGrp}/${file}`)
        const group = command.group
        if(!client.commands.get(group)){
            var commandsArr = [command]
            client.commands.set(group,commandsArr)
        }
        else {
            var commandArr = Array.from(client.commands.get(group))
            commandArr.push(command)
            client.commands.set(group, commandArr)
        }
    }
}

/* Handling messages. */
client.on('message', async message => {

    /* Ignoring messages from bots. */
    if(message.author.bot)
        return

    /* Scanning messages for blacklisted words */
    if(!message.content.startsWith(prefix)) {
        messageMonitor(message)
        return
    }

    /* Pass control to command handler. */
    commandHandler(message)   
});

/* Handling the READY, RECONNECTING AND DISCONNECT events of the client. */
client.once('ready', () => {
    /* Connecting to database */
    connectToDatabase(client).then(err => {
        if(err)
            console.log(err)
        console.log(`Setup complete. Bot ready!`);
    }) 
});

client.once('reconnecting', () => {
    console.log(`Attempting to reconnect...`);
});

client.once('disconnect', () => {
    console.log(`Disconnected.`);
})


/* Handling guildCreate, guildDelete events */
client.on('guildCreate', (guild) => {
    eventHandlers.guildCreate(guild, Servers)
})

client.on('guildDelete', (guild) => {
    eventHandlers.guildDelete(guild,Servers)
})

client.on('guildMemberAdd', (member) => {
    eventHandlers.guildMemberAdd(member, client)
})

