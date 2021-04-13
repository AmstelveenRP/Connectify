const Discord = require("discord.js");
const { default_prefix } = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({embed: {
        color: 7506394,
        description: "You are missing the permission `ADMINISTRATOR`"
      }});

    let msg;
    let textChannel = message.mentions.channels.first()
    message.delete()

    if(textChannel) {
        msg = args.slice(1).join(" ");
        let embed = new Discord.MessageEmbed()
        .setColor(1947988)
        .setDescription(msg)
        textChannel.send(embed)
    } else {
        msg = args.join(" ");
        let embed2 = new Discord.MessageEmbed()
        .setColor(1947988)
        .setDescription(msg)
        message.channel.send(embed2)
    }

}
module.exports.help = {
    name: "embed"
}