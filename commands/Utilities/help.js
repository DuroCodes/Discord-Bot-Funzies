const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  let helpEmbed = new Discord.MessageEmbed()
  .setTitle("**Crystals Crescent Commands**")
  .setColor(color.black)
  .setDescription("[args] are required arguments. | (args) are optional arguments.")
  .addField("**⚙️ | Administration**","`-announce [announcement]` - creates an announcement to the server.\n`-purge [messages]` - purges a number of messages in the server.")
  .addField("**🎲 | Fun**","`-pp (user)` - detects the user's penis size and displays it.")
  .addField("**📊 | Stats**","`-bw [username]` - uses Hypixel's API to scan a user's BedWars stats.\n`-sw [username]` - uses Hypixel's API to scan a user's SkyWars stats.")
  .addField("**⚒️ | Utilities**","`-help` - displays all commands in the bot.\n`-embed [channel] [json data]` - creates an embed.")
  .addField("**🎟️ | Tickets**","`-add [user]` - adds a user to a ticket.\n`-remove [user]` - removes a user from a ticket.\n`-claim` - allows a member to claim a ticket.\n`-close (reason)` - closes a ticket.\n`-ticket` - creates the ticket embed.\n`-setlogs` - sets the logs channel for the ticket system.")
  .setFooter(`Crystals Crescent Bot`, bot.user.displayAvatarURL())
  .setTimestamp();

  message.channel.send(helpEmbed)
  
}
exports.help = {
    name: "help",
    aliases: ['h'],
    description: 'Displays all commands in the bot.'
}