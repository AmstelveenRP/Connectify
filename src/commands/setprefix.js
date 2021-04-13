const Discord = require("discord.js");
const { default_prefix } = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send({embed: {
            color: 7506394,
            description: "You are missing the permission `ADMINISTRATOR`"
          }});
        }

      if(!args[0]) {
        return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}setprefix**\n\n**Description:** Set a custom prefix for the bot!\n**Usage:**\n${prefix}setprefix "[prefix]"\n**Example:**\n${prefix}setprefix`
          }});
        }

      if(args[1]) {
        return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}setprefix**\n\n**Description:** Set a custom prefix for the bot!\n**Usage:**\n${prefix}setprefix "[prefix]"\n**Example:**\n${prefix}setprefix`
          }});
        }

      if(args[0].length > 3) {
        return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}setprefix**\n\n**Description:** Set a custom prefix for the bot!\n**Usage:**\n${prefix}setprefix [prefix]\n**Example:**\n${prefix}setprefix`
          }});
        }

      if(args.join("") === default_prefix) {
        db.delete(`prefix_${message.guild.id}`)
        return await message.channel.send({embed: {
            color: 1947988,
            description: "The prefix has been reseted to `!`"
          }});
        }

      db.set(`prefix_${message.guild.id}`, args[0])
      await message.channel.send({embed: {
        color: 1947988,
        description: `My prefix has been changed to **${args[0]}**. For more commands type **${args[0]}help**!`
      }});
    }

module.exports.help = {
    name: "setprefix"
}