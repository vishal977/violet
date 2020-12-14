const { arrayToString } = require('../../utils')
const fs = require('fs')
var Jimp = require('jimp')
const randomstring = require('randomstring')

module.exports = {
	name: 'dumber',
    description: 'For the dumbest person alive...',
	guildOnly : true,
    args: true,
    group: 'Meme',
    usage: '<user> <text>',

    async execute(message,args) {
        var user = message.mentions.members.first()
        args.shift()
        if(!args.length)
            return message.channel.send(`You need to enter a sentence as input.`)
        
        const memeText = arrayToString(args)
        const image = await Jimp.read(`/app/assets/meme-templates/dumber.jpg`)

        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
        await image.print(font, 87,305, memeText,123)
        await image.print(font, 343,227, `*${user.user.username}`)
        const editedFileName = randomstring.generate(7) + '.jpg'
        await image.writeAsync(`/app/assets/meme-templates/${editedFileName}`)
        await message.channel.send(``, {files: [`/app/assets/meme-templates/${editedFileName}`]})
        fs.unlink(`/app/assets/meme-templates/${editedFileName}`, err => {
            if(err)
                console.log(err)
        })
        return
    }
}