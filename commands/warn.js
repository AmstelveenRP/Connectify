const Discord = require("discord.js");
const { default_prefix } = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;

    if(!message.member.hasPermission("KICK_MEMBERS")) {
        return message.channel.send({embed: {
            color: 7506394,
            description: "You are missing the permission `KICK_userS`"
          }});
        }

        const user = message.mentions.users.first() || message.guild.users.cache.get(args[0]);

        if(!user) return message.channel.send({embed: {
            color: 8355711,
            description: `**Command: ${prefix}warn**\n\n**Description:** Warn a user!\n**Usage:**\n${prefix}warn [user] [reason]\n**Example:**\n${prefix}warn @BusyNightz#0216 noob`
          }});

          if(user.id === message.author.id) return message.channel.send({embed: {
            color: 8355711,
            description: `You are not allowed to kick yourself. Noob.`
          }});

          let reason = args.slice(1).join(" ");
          let kicksreason = args.join("You reached 3 warnings, so you got automaticlly kicked!");

          if(reason === undefined) reason = 'No reason has been given for the kick';

          let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

          if(warnings === 3) return message.channel.send({embed: {
            color: 1947988,
            description: `${user} reached already __3__ warnings`
          }});

          if(warnings === null) {
              db.set(`warnings_${message.guild.id}_${user.id}`, 1);
              user.send(`You were __warned__ in ${message.guild.name} for: __${reason}__`)
              await message.channel.send({embed: {
                color: 1947988,
                description: `<:check:831296000164495392> Successfully __warned__ ${user}`
              }});
    
          }

          if(warnings !== null)
          db.set(`warnings_${message.guild.id}_${user.id}`, 1);
          user.send(`You were __warned__ in ${message.guild.name} for: __${reason}__`)
          await message.channel.send({embed: {
            color: 1947988,
            description: `<:check:831296000164495392> Successfully __warned__ ${user}`
          }});


}
module.exports.help = {
    name: "warn"
}