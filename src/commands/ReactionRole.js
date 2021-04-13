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

    const channel = '831310804115914762';
    const EDM = message.guild.roles.cache.find(role => role.name === "(!) EDM");
    const Rock = message.guild.roles.cache.find(role => role.name === "(!) Rock");
    const Pop = message.guild.roles.cache.find(role => role.name === "(!) Pop");
    const Techno = message.guild.roles.cache.find(role => role.name === "(!) Techno");
    const Dubstep = message.guild.roles.cache.find(role => role.name === "(!) Dubstep");
    const Jazz = message.guild.roles.cache.find(role => role.name === "(!) Jazz");
    const Electro = message.guild.roles.cache.find(role => role.name === "(!) Electro");

    const EDMEmoji = '🎧';
    const RockEmoji = '🎸';
    const PopEmoji = '🎤';
    const TechnoEmoji = '🎹';
    const DubstepEmoji = '🎺'; 
    const JazzEmoji = '🎷'; 
    const ElectroEmoji = '🥁';

    let embed = new Discord.MessageEmbed()
        .setColor(1947988)
        .setTitle('Choose your favorite music genre!')
        .setDescription(`${EDMEmoji} EDM\n${RockEmoji} Rock\n${PopEmoji} Pop\n${TechnoEmoji} Techno\n${DubstepEmoji} Dubstep\n${JazzEmoji} Jazz\n${ElectroEmoji} Electro\n`);

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(EDMEmoji);
    messageEmbed.react(RockEmoji);
    messageEmbed.react(PopEmoji);
    messageEmbed.react(TechnoEmoji);
    messageEmbed.react(JazzEmoji);
    messageEmbed.react(ElectroEmoji);

    bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === EDMEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(EDM);
            }
            if (reaction.emoji.name === RockEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(Rock);
            }
            if (reaction.emoji.name === PopEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(Pop);
            }
            if (reaction.emoji.name === TechnoEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(Techno);
            }
            if (reaction.emoji.name === DubstepEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(Dubstep);
            }
            if (reaction.emoji.name === JazzEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(Jazz);
            }
            if (reaction.emoji.name === ElectroEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(Electro);
            }

        } else {
            return;
        }

    });

    bot.on('messageReactionRemove', async (reaction, user) => {

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;


        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === EDMEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(EDM);
            }
            if (reaction.emoji.name === RockEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(Rock);
            }
            if (reaction.emoji.name === PopEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(Pop);
            }
            if (reaction.emoji.name === TechnoEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(Techno);
            }
            if (reaction.emoji.name === DubstepEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(Dubstep);
            }
            if (reaction.emoji.name === JazzEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(Jazz);
            }
            if (reaction.emoji.name === ElectroEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(Electro);
            }

        } else {
            return;
        }
    });   

}
module.exports.help = {
    name: "reactionrole"
}