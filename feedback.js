const Discord = require('discord.js');
const prompter = require('discordjs-prompter');
const fs = require("fs");
module.exports.run = async(client, message, args) => {

    const rating = await prompter.choice(message.channel, {
        question: 'How was your experince? Please react below!',
        choices: ['✅', '❌'],
        userId: message.author.id
    });

    let data = JSON.parse(fs.readFileSync("./rating.json", "utf8"));
    var good = parseInt(data.goodrating)
    var bad = parseInt(data.badrating)

    if (rating === '✅') {
        good++;
    } else if (rating === '❌') {
        bad++;
    };

    var channelrating = {
        goodrating: good,
        badrating: bad,
    }
    fs.writeFile("./rating.json", JSON.stringify(channelrating), err => {
        if (err) console.log("Error writing file:", err);
    });

    prompter
        .message(message.channel, {
            question: 'Leave your feedback with full detail!',
            userId: message.author.id,
            max: 1,
            timeout: 30000,
        })
        .then(responses => {
            if (!responses.size) {
                return message.channel.send(`Please try again and answer quicker!`);
            }
            const response = responses.first();

            let embed = new Discord.MessageEmbed()
                .setTitle("Feedback:")
                .setColor("#FFA500")
                .addField('Feedback From:', message.author)
                .addField(`Feedback Message:`, response)
                .addField(`Rating:`, rating)
                .setImage("https://cdn.discordapp.com/attachments/708353767233552498/821097975686103049/X93m96j20sgJW2TK7EMYyzOifZG6UlkzCuV3Grpv3M2l2Nns5f8BgsYydFTm0V4AAAAASUVORK5CYII.png")
                .setTimestamp(new Date())
            message.channel.send(`Thank you ${message.author}, your feedback has been sent!`)
            const feedbackchannel = (message.guild.channels.cache.find(channel => channel.name === "feedback"))
            feedbackchannel.send(embed)

            feedbackchannel.send(`**Good Reviews:** ${good} | **Bad Reviews:** ${bad}`)
            setTimeout(() => { console.log("Setting Channel Topic"); }, 300000);
            feedbackchannel.setTopic(`**Good Reviews:** ${good} | **Bad Reviews:** ${bad}`)
        });
}

module.exports.help = {
    name: "feedback"
}