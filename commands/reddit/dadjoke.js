const Discord = require('discord.js');
const axios = require('axios');
const { dadJokesAPI, redditOrange } = require('../../config.json');
const utils = require('../../utils')

module.exports = {
	name: 'dadjoke',
    aliases: ['dadjokes'],
    description: 'Nothing beats a good dad joke!',
	guildOnly : false,
    args: false,
    group: 'Reddit',

	async execute(message) {
        let getJoke = async () => {
            const url = dadJokesAPI
            let res = await axios.get(url);
            let joke = utils.randomArrayElement(res.data.data.children);
            return joke
        }
        let joke = await getJoke();

        const postEmbed = new Discord.MessageEmbed()
        .setColor(redditOrange)
        .setTitle(`${joke.data.title}`)
        .setThumbnail('https://styles.redditmedia.com/t5_2t0no/styles/communityIcon_cz3l7pl9n6441.png?width=256&s=1b8e90ac273135b6bdad60458e35faae57ad214a')
        .setDescription(`${joke.data.selftext} :laughing: `)
        .setTimestamp()

        return message.channel.send(postEmbed);
	}
}
