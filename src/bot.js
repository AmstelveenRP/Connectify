const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const config = require("./config.json");
const { token, default_prefix } = require("./config.json")
const db = require("quick.db")


bot.login(config.token).then(function() {
  console.log(`Connected to discord and logged in as ${bot.user.tag}`)
}).catch((e) => {
  console.log(e)
})

bot.on('ready', async() => {
  bot.user.setActivity(config.game, { type: 'LISTENING' });
});

bot.on('guildCreate', guild => {
    guild.systemChannel.send("**Hey, peanut here! :peanuts:** Thank you for inviting me to your Discord :thumbsup: You can see a list of commands with `!help`. For support and bugs contact the Developer `BusyNightz#0216` :robot: ")
  });


fs.readdir('./commands', (err, files) => {
    if (err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log('No commands have been found why not make some!')
        return;
    }

    jsfile.forEach((file, i) => {
        let props = require(`./commands/${file}`)
        console.log(`${file} has been loaded`)
        bot.commands.set(props.help.name, props)
    })

    bot.on('guildMemberAdd', member => {
      const channel = member.guild.channels.cache.find(channel => channel.name === "🌎-general")
      const channel2 = member.guild.channels.cache.find(channel => channel.name === "❗-information")
      if (!channel) return;
  
      member.roles.add(member.guild.roles.cache.find(i => i.name === '🎶 Listeners'))
  
      const joinembed = new Discord.MessageEmbed()
      .setDescription(`Hey ${member} welcome on the **Connectify** server! Please feel free to share your music with the other people around. Before continuing read ${channel2}`)
      .setColor(1947988)
  
      channel.send(joinembed)
  })

  bot.on('messageReactionAdd', async (reaction, user) => {
    const handleStarboard = async () => {
        const SBChannel = bot.channels.cache.find(channel => channel.name.toLowerCase() === '⭐-starboard');
        const msgs = await SBChannel.messages.fetch({ limit: 100 });
        const SentMessage = msgs.find(msg => 
            msg.embeds.length === 1 ?
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(SentMessage) SentMessage.edit(`${reaction.count} - ⭐`);
        else {
if(reaction.count === 2){
            const embed = new Discord.MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
            .setDescription(`__[Jump to the message](${reaction.message.url})__\n\n${reaction.message.content}\n`)
            .setColor(1947988)
            .setFooter(reaction.message.id)
            .setTimestamp();
            if(SBChannel)
            SBChannel.send(`${reaction.count} - ⭐`, embed);
        }
}
    }
    if(reaction.emoji.name === '⭐') {
        if(reaction.message.channel.name.toLowerCase() === '⭐-starboard') return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
        handleStarboard();
    }
});

    bot.on('message', async message => {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;

        if (!message.content.startsWith(prefix)) return
        if (message.author.bot || message.channel.type === "dm") return

        let messageArray = message.content.split(' ')
        let cmd = messageArray[0]
        let args = messageArray.splice(1)
        let commandFile = bot.commands.get(cmd.slice(prefix.length))


        if (commandFile) commandFile.run(bot, message, args)
    })
})
