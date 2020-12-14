const { triviaAPI } = require('../../config.json');
const axios = require('axios')
const { base64ToUTF8, shuffleArray } = require('../../utils');
const Discord = require('discord.js');

module.exports = {
	name: 'trivia',
    description: 'Nothing like trivia questions to kill time..',
	guildOnly : false,
    args: false,
    group: 'Fun',
	async execute(message) {
        let getTriviaQuestion = async () => {
            const url = triviaAPI
            let res = await axios.get(url);
            let question = res.data.results[0]
            return question
        }
        getTriviaQuestion()
        let questionObject = await getTriviaQuestion();
        const question = base64ToUTF8(questionObject.question)
        const ans = questionObject.correct_answer
        const answer = base64ToUTF8(questionObject.correct_answer)
        const options = questionObject.incorrect_answers
        var optionsArray = []
        optionsArray.push(answer)
        for(let option of options) {
            optionsArray.push(base64ToUTF8(option))
        }
        optionsArray = shuffleArray(optionsArray)

        const difficulty = base64ToUTF8(questionObject.difficulty)
        const category = base64ToUTF8(questionObject.category)

        var timeLeft = 15
        const triviaEmbed = new Discord.MessageEmbed()
        triviaEmbed.setColor('#b743e6')
        .setTitle(question)
        .addFields(
            {name: 'Option 1', value: optionsArray[0], inline: true},
            {name: 'Option 2', value: optionsArray[1], inline: true},
            {name: 'Option 3', value: optionsArray[2], inline: true},
            {name: 'Option 4', value: optionsArray[3], inline: true},
        )
        .setFooter(`Difficulty: ${difficulty} \t Category: ${category} \t Time left: ${timeLeft}`)

        message.channel.send(triviaEmbed)
        .then(msg => {
            var x = setInterval(() => {
                if(timeLeft === 0) {
                    clearInterval(x)
                    const triviaEnded = new Discord.MessageEmbed().setColor('#b743e6')
                    .setTitle(`Trivia ended. You ran out of time.`)
                    .setDescription(question)
                    .addField(`Right answer`, answer, false)
                    return msg.edit(triviaEnded)
                }
                timeLeft -= 1
                triviaEmbed.setFooter(`Difficulty: ${difficulty} \t Category: ${category} \t Time left: ${timeLeft}`)
                msg.edit(triviaEmbed)
            }, 1000)

            const answerCollector = new Discord.MessageCollector(message.channel, m => true ,{ time: timeLeft*1000 })
            answerCollector.on('collect', answerReceived => {
                if(answerReceived.content.toLowerCase() === answer.toLowerCase()){
                    clearInterval(x)
                    answerCollector.stop()
                    const triviaEnded = new Discord.MessageEmbed().setColor('#b743e6')
                    .setTitle(`Trivia ended. ${answerReceived.author.username} gave the right answer`)
                    .setDescription(question)
                    .addField(`Right answer`, answer, false)
                    msg.edit(triviaEnded)
                    return message.channel.send(`${answerReceived.author} got the answer right: ${answer}`)
                }
            })
        })

	}
};