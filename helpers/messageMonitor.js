module.exports.messageMonitor = function(message) {
    let wordArray = message.content.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?@]/g,"").split(" ");

    const serverDetails = message.client.serversCache.find(cacheItem => cacheItem.serverID === message.member.guild.id)

    for(let w of serverDetails.blackList) {
        if(wordArray.includes(w)){
            message.delete({timeout:0, reason: `Contains blacklisted words`})
            message.channel.send(`${message.author} your message was deleted as it contains one or more blacklisted words`)
            .then(msg => {msg.delete({timeout: 3000})})
            .catch(err => {console.log(err)})
        }
    }
}