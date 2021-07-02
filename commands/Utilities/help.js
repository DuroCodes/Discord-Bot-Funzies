const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  let helpEmbed = new Discord.MessageEmbed()
  .setTitle("**Discord Bot Commands**")
  .setColor(color.none)
  .addField("**Administration**","`-announce [announcement]` - creates an announcement to the server.\n`-purge [messages]` - purges a number of messages in the server.\n`-setlogs [channel]` - sets the logs server for the ticket system.")
  .addField("**Fun**","`-pp (user)` - detects the user's penis size and displays it.")
  .addField("**Stats**","`-bw [username]` - uses Hypixel's API to scan a user's BedWars stats.")
  .addField("**Utilities**","`-close` - closes a ticket.\n`-ticket` - creates the ticket embed.\n`-embed [channel] [json data]` - creates an embed.")
  .setFooter(`Discord Bot`, bot.user.displayAvatarURL());

  message.channel.send(helpEmbed)
  
}
exports.help = {
    name: "help",
    aliases: ['h'],
    description: 'Displays all commands in the bot.'
}