const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  let helpEmbed = new Discord.MessageEmbed()
  .setTitle("**Discord Bot Commands**")
  .setColor(color.none)
  .addField("**Administration**","`i!announce [announcement]` - creates an announcement to the server.\n`i!purge [messages]` - purges a number of messages in the server.\n`i!setlogs [channel]` - sets the logs server for the ticket system.")
  .addField("**Fun**","`i!pp (user)` - detects the user's penis size and displays it.")
  .addField("**Stats**","`i!bw [username]` - uses Hypixel's API to scan a user's BedWars stats.")
  .addField("**Utilities**","`i!close` - closes a ticket.\n`i!ticket` - creates the ticket embed.\n`i!help` - displays all commands in this bot.")
  .setFooter(`Discord Bot`, bot.user.displayAvatarURL());

  message.channel.send(helpEmbed)
  
}
exports.help = {
    name: "embed",
    aliases: ['emb','e'],
    description: 'Creates an embed with user input.'
}