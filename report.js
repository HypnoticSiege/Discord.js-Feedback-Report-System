const Discord = require('discord.js');
const prompter = require('discordjs-prompter');
const fs = require("fs");
module.exports.run = async(client, message, args) => {

    var yes = "✅";
    var no = "❌";
  
    const rating2 = await prompter.choice(message.channel, {
        question: 'Is your report an emergancy, meaning it needs to be viewed by Moderators ASAP?',
        choices: [yes, no],
        userId: message.author.id
    });
    message.delete()

    var one = "1️⃣";
    var two = "2️⃣";
    var three = "3️⃣";
    var four = "4️⃣";
    var five = "5️⃣";

    const rating = await prompter.choice(message.channel, {
        question: 'Why are you reporting the user? Please react below on what they have done!`\n\n[1] - Hacking\n[2] - Spamming\n[3] - Racism\n[4] - Advertising\n[5] - Trolling`',
        choices: [one, two, three, four, five],
        userId: message.author.id
    });
    message.delete()

    prompter
        .message(message.channel, {
            question: 'Please give a detailed explantaion of the report!',
            userId: message.author.id,
            max: 1,
            timeout: 30000,
        })

        .then(responses => {
            if (!responses.size) {
                return message.channel.send(`Please try again and answer quicker!`);
            }
            const response = responses.first();
            message.delete(response)

            prompter
            .message(message.channel, {
                question: 'Please send the Discord Name & ID of the person you are reporting!',
                userId: message.author.id,
                max: 1,
                timeout: 30000,
            })
    
            .then(responses => {
                if (!responses.size) {
                    return message.channel.send(`Please try again and answer quicker!`);
                }
    
                const response2 = responses.first();
                message.delete(response2)

            let embed = new Discord.MessageEmbed()
            .setTitle("Report:")
            .setColor("#FFA500")
            .addField('Is the report an emergancy:', rating2)
            .addField('Reported By:', message.author)
            .addField(`Discord Name & ID:`, response2)
            .addField('Type of Report:', rating + "`\n\n[1] - Hacking\n[2] - Spamming\n[3] - Racism\n[4] - Advertising\n[5] - Trolling`")
            .addField(`Detailed Explanation of the Report:`, response)
            .setThumbnail("https://cdn.discordapp.com/attachments/708353767233552498/821080397579943966/tenor.png")
            .setTimestamp(new Date())
                message.channel.send(`Thank you ${message.author}, your report has been sent!`)
                const feedbackchannel = (message.guild.channels.cache.find(channel => channel.name === "reports"))
            feedbackchannel.send(embed)
        });
    });
}

module.exports.help = {
    name: "report"
}