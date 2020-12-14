const axios = require('axios');
const Discord = require('discord.js');
const { nextLevelAPI, redditOrange } = require('../../config.json');
const utils = require('../../utils')

module.exports = {
	name: 'nextlevel',
    aliases: ['nextfuckinglevel'],
    description: 'Stuff that\'s on a whole new level!',
	guildOnly : false,
    args: false,
    group: 'Reddit',

	async execute(message) {
        let initialMessage = null; 
        message.channel.send(`Fetching post... :hourglass:`).then(msg => initialMessage = msg)
        let getPost = async () => {
            const url = nextLevelAPI
            let res = await axios.get(url);
            let post = utils.randomArrayElement(res.data.data.children);
            return post
        }
        var redditPost = null;
        while(true) {
            let post = await getPost()
            if(!post.data.is_video || post.data.url.endsWith('.jpg') || post.data.url.endsWith('.png')){
                redditPost = post
                break;
            }
        }

        const postEmbed = new Discord.MessageEmbed()
        .setColor(redditOrange)
        .setTitle(`r/nextfuckinglevel`)
        .setURL(`https://reddit.com${redditPost.data.permalink}`)
        .setDescription(`${redditPost.data.title}`)
        .setImage(`${redditPost.data.url}`)
        .setTimestamp()

        return initialMessage.edit(postEmbed)
	}
}
