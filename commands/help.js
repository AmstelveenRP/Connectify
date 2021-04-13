const Discord = require("discord.js");
const { default_prefix } = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;

    let embed = new Discord.MessageEmbed()
    .setColor(1947988)
    .setDescription(`These are the available for the Connectify Discord Bot. You can them with the current prefix ${prefix} for further questions ask our staffteam!`)
    .addField("🔍 Moderator", "`ban`, `kick`, `warn`, `warnings`, `clearwarns`, `purge`, `embed`")

    .setFooter("We are in no way in collaboration with Spotify. This is a personal project with no further intentions.", 'https://imgur.com/zT0BIfJ.png')

    message.channel.send(embed)
    

}
module.exports.help = {
    name: "help"
}