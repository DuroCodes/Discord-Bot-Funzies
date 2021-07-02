const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if(message.member.hasPermission('ADMINISTRATOR')){
    var channel = message.mentions.channels.first();
    if(!channel) return functions.errorEmbed(message, message.channel, "Please input a channel.");

    let text = args.slice(1).join(" ");
    if(!channel) return functions.errorEmbed(message, message.channel, "Please input an announcement message.");
    
    message.delete();

    announcementEmbed = new Discord.MessageEmbed()
    .setTitle("📢 | Announcement")
    .setColor(color.cyan)
    .setDescription(text)
    .setFooter("Announcement by " + message.member.user.tag, message.member.user.displayAvatarURL());

    channel.send(announcementEmbed)
  }
  else {
    functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions ");
    message.delete();
  }

}

exports.help = {
    name: "announce",
    aliases: ['a', 'ann'],
    description: 'Announce something to the server.'
}