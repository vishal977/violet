const shakespeareRoasts = require('../../assets/shakespeareRoasts.json')
const { randomArrayElement, mentionedUserIsSelf } = require('../../utils')

module.exports = {
    name: 'sroast',
    aliases: ['ssroast'],
    description: 'Good old Shakespeare insults.',
	guildOnly : true,
    args: true,
    group: 'Fun',
    usage: '<user>',
   
	execute(message) {
        var user = message.mentions.members.first();
        
        if(mentionedUserIsSelf(user)) 
            return message.reply(`What madeth thee bethink yond I wouldst roast mine own self? :face_with_monocle:`)

        var roast = randomArrayElement(shakespeareRoasts.startWith) + 
            randomArrayElement(shakespeareRoasts.col1) + 
        ", " + randomArrayElement(shakespeareRoasts.col2) + " " + randomArrayElement(shakespeareRoasts.col3) + "!"

        message.channel.send(`${user}, ${roast}`)
	}
}