const Discord = require("discord.js");
const { default_prefix } = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {

    const user = message.mentions.users.first() || message.guild.users.cache.get(args[0]);

    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;

    if(!message.member.hasPermission("KICK_MEMBERS")) {
        return message.channel.send({embed: {
            color: 7506394,
            description: "You are missing the permission `KICK_userS`"
          }});
        }

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) return message.channel.send(`__${user.username}__ has __0__ warnings`)

        db.delete(`warnings_${message.guild.id}_${user.id}`)

        message.channel.send({embed: {
            color: 1947988,
            description: `<:check:831296000164495392> Successfully cleared warnings all for: ${user.username}`
          }});
    

}
module.exports.help = {
    name: "clearwarns"
}