const { arrayToString } = require('../../utils')
const fs = require('fs')
var Jimp = require('jimp')
const randomstring = require('randomstring')

module.exports = {
	name: 'forgotbrain',
    description: 'Oh I forgot to give you a brain.',
	guildOnly : true,
    args: true,
    group: 'Meme',
    usage: '<text>',

    async execute(message,args) {
        if(!args.length)
            return message.channel.send(`You need to enter a sentence as input.`)
        
        const memeText = arrayToString(args)
        const image = await Jimp.read(`/app/assets/meme-templates/brain.jpg`)

        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
        await image.print(font, 30,372, memeText,240)
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