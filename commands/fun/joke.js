const axios = require('axios')
const { jokesAPI } = require('../../config.json')

module.exports = {
	name: 'joke',
    description: 'Cracks a joke.',
	guildOnly : false,
    args: false,
    group: 'Fun',
	async execute(message) {
        let getJoke = async () => {
            const url = jokesAPI + "random_joke";
            let res = await axios.get(url);
            let joke = res.data;
            return joke;
        }
        let joke = await getJoke();
        return message.channel.send(`**${joke.setup}** \n *${joke.punchline}* :wink: `);
	}
}