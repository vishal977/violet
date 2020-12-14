const { prefix } = require('../../config.json')

module.exports = {
	name: 'help',
	aliases: ['commands'],
    description: 'Get a list of all the commands I respond to or info about a specific command.',
	guildOnly : false,
	args: false,
	group: 'Info',
	usage: '<command-name>',
    
	execute(message, args) {
		const { commands } = message.client
		const data = []
		let groups = Array.from(commands.keys());

		//If no arguments provided, print all available commands groups.
		if(!args.length) {
			data.push(`**Command categories for Violet:** `)

			let i = 1;
			for(let group of groups) {
				data.push(`${i++}. ${group} commands`)
			}

			data.push(`**P.S:** You can say ${prefix}help category to list all commands in a category.`)

			return message.channel.send(data).catch(err => {console.log(err)})
		}

		//Info about a specific command/category
		const commandName = args[0].toLowerCase()

		// Iterate through each command group.
		for(let group of groups) {
			var c = Array.from(commands.get(group))
			if(group.toLowerCase() === commandName.toLowerCase()) {
				let k = 1
				data.push(`**${group} commands**`)
				for(i = 0; i<c.length; i++) {
					data.push(`${k++}. ${c[i].name}`)
				}
				data.push(`**P.S:** You can say ${prefix}help command to get more info about a command.`)
			}
			else {
				for(i = 0; i<c.length; i++) {
					if(c[i].name === commandName || (c[i].aliases && c[i].aliases.includes(commandName))) {
						data.push(`**Name:** ${c[i].name}`)
						if(c[i].aliases) data.push(`**Aliases:** ${c[i].aliases.join(', ')}`)
						if(c[i].description )data.push(`**Description:** ${c[i].description}`)
						if(c[i].usage )data.push(`**Usage:** \`${prefix}${c[i].name} ${c[i].usage}\``)
						if(c[i].needsPermissions )data.push(`**Permissions needed:** ${c[i].needsPermissions.join(', ')}`)
					}
				}
			}
		}

		//Data array will be empty if there is no matching command/group
		if(!data.length) {
			return message.reply(`No such command/category found.`)
		}
		
		message.channel.send(data, { split: true })
	}
}