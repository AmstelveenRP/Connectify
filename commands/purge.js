const Discord = require("discord.js");
const { default_prefix } = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {



    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send({embed: {
            color: 7506394,
            description: "You are missing the permission `KICK_userS`"
          }});
        }

        const args2 = args.slice(1).join(" ");
        const amount = args.join(' '); 
        
        if (!amount) return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}purge**\n\n**Description:** Mass delete!\n**Usage:**\n${prefix}purge [1-100]\n**Example:**\n${prefix}purge 50`
          }});
        if (isNaN(amount)) return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}purge**\n\n**Description:** Mass delete!\n**Usage:**\n${prefix}purge [1-100]\n**Example:**\n${prefix}purge 50`
          }});
        
        if (amount > 100) return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}purge**\n\n**Description:** Mass delete!\n**Usage:**\n${prefix}purge [1-100]\n**Example:**\n${prefix}purge 50`
          }});
        if (amount < 1) return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}purge**\n\n**Description:** Mass delete!\n**Usage:**\n${prefix}purge [1-100]\n**Example:**\n${prefix}purge 50`
          }});
        
        await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
            message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
        )});

}
module.exports.help = {
    name: "purge"
}