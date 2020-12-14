const Discord = require('discord.js');
const { prefix, defaultWelcomeTitle, defaultWelcomeBody } = require('../config.json')
const {  isARole } = require('../utils')

module.exports = {
    async guildCreate(guild) {
        var serverDetails = {
            serverID: guild.id, 
            serverName: guild.name, 
            systemChannel: guild.systemChannelID, 
            isGreetingAllowed: true, 
            defaultRoles: [],
            blackList: [],
            welcomeMessageTitle: defaultWelcomeTitle,
            welcomeMessageBody: defaultWelcomeBody
        };

        try {
            Servers.insertOne(serverDetails, function(err, data) {
                if(err)
                    console.log(err)
            })

            const messageEmbed = new Discord.MessageEmbed()
            messageEmbed.setColor('#9900ff')
            .setTitle(`Hello from the other side! :smile: `)
            .setDescription(`I am Violet. Thanks for having me over. Bleep Bloop! :robot: `)
            .attachFiles(['./assets/violet.jpg'])
            .setThumbnail('attachment://violet.jpg')
            .setTimestamp()
            .setFooter(`Type ${prefix}commands to get a list of all my commands`)

            return guild.systemChannel.send(messageEmbed)
        }
        catch(e) {
            console.log(e)
        }
    },

    async guildDelete(guild) {
        try {
            Servers.deleteOne({serverID: guild.id}, function(err, res) {
                if(err)
                    console.log(err)
            })
            return
        }
        catch(e) {
            console.log(e)
        }
    },

    async guildMemberAdd(member,client) {
        const guild = member.guild

        const serverDetails = client.serversCache.find(cacheItem => cacheItem.serverID === guild.id)   
               
        const defaultRoles = serverDetails.defaultRoles

        if(serverDetails.isGreetingAllowed) {

            const greetingTitle = serverDetails.welcomeMessageTitle
            const greetingBody = serverDetails.welcomeMessageBody.replace('--USER--', member)

            if(guild.systemChannel) {
                const welcomeEmbed = new Discord.MessageEmbed()
                welcomeEmbed.setColor('#9900ff')
                .setTitle(`${greetingTitle}`)
                .setDescription(`${greetingBody}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp()
                
                guild.systemChannel.send(welcomeEmbed)
            }
        }

        for(let defaultRole of defaultRoles) {
            const foundRole = isARole(defaultRole, guild)
            if(foundRole)
                member.roles.add(foundRole.id)
        }
    }
}