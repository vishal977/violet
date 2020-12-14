const roastsJSON = require('../../assets/roasts.json')
const utils = require('../../utils')

module.exports = {
	name: 'roast',
    description: 'Someone\'s being annoying? Roast \'em!',
	guildOnly : true,
    args: true,
    group: 'Fun',
    usage: '<user>',

	execute(message) {
        var user = message.mentions.members.first();

        if(utils.mentionedUserIsSelf(user))
            return message.reply(`What made you think that I'd roast myself? :face_with_raised_eyebrow:`)

        message.channel.send(`${user}, ${utils.randomArrayElement(roastsJSON.roast)}`)
	}
};