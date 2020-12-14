module.exports = {
	name: 'cointoss',
	aliases: ['flip', 'toss', 'coinflip'],
    description: 'Tosses a coin.',
	guildOnly : false,
	args: false,
	group: 'Fun',
	execute(message) {
		const flip = (Math.floor(Math.random() * 2) == 0) ? 'Heads!' : 'Tails!';
	    message.channel.send(`**${message.author} flipped a coin:** ${flip}`);
	}
};