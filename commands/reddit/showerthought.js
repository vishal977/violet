const Discord = require('discord.js');
const axios = require('axios');
const { showerThoughtsAPI, redditOrange } = require('../../config.json');
const utils = require('../../utils')

module.exports = {
	name: 'showerthought',
    description: 'A shower thought for you to ponder over for the day.',
	guildOnly : false,
    args: false,
    group: 'Reddit',
	async execute(message) {
        let getShowerThought = async () => {
            let res = await axios.get(showerThoughtsAPI);
            let thought = utils.randomArrayElement(res.data.data.children);
            return thought
        }
        let showerThought = await getShowerThought();
        
        const postEmbed = new Discord.MessageEmbed()
        .setColor(redditOrange)
        .setTitle(`r/showerthoughts`)
        .setThumbnail('https://styles.redditmedia.com/t5_2szyo/styles/communityIcon_x3ag97t82z251.png?width=256&s=33531dceba6466953aadef3073f36cfc2e267175')
        .setDescription(`${showerThought.data.title} :thinking: `)
        .setTimestamp()
        return message.channel.send(postEmbed);
	}
}