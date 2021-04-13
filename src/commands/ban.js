const Discord = require("discord.js");
const { default_prefix } = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;

    message.delete()

    if(!message.member.hasPermission("BAN_MEMBERS")) {
        return message.channel.send({embed: {
            color: 7506394,
            description: "You are missing the permission `BAN_MEMBERS`"
          }});
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}ban**\n\n**Description:** ban a user from the server!\n**Usage:**\n${prefix}ban [user] [reason]\n**Example:**\n${prefix}ban @BusyNightz#0216 noob`
          }});

          if(!member) return message.channel.send({embed: {
            color: 8355711,
            description: `This is not a valid member`
          }});

          if(!member.bannable) return message.channel.send({embed: {
            color: 8355711,
            description: `This user has a higher role then yours or has administrator permissions.`
          }});

          if(member.id === message.author.id) return message.channel.send({embed: {
            color: 8355711,
            description: `You are not allowed to ban yourself. Noob.`
          }});

          let reason = args.slice(1).join(" ");

          if(reason === undefined) reason = 'No reason has been given for the ban';

          member.ban({ days: 7, reason: 'You are banned from Connectify' })

          const succesembed = new Discord.MessageEmbed()
          .setColor(1947988)
          .setDescription(`<:check:831296000164495392> Successfully __banned__ ${member}`)
          message.channel.send(succesembed)

          const logs = member.guild.channels.cache.find(channel => channel.name === "🌌-logs")

          
          const banembed = new Discord.MessageEmbed()
          .setColor(8355711)
          .addField("User baned", member, true)
          .addField("banned by", message.author, true)
          .addField("Reason", reason, true)
          logs.send(banembed)



}
module.exports.help = {
    name: "ban"
}