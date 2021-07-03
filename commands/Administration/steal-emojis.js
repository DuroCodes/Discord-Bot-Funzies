const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if(message.member.hasPermission("ADMINISTRATOR")) {     ///To allow a simple moderator to use the command just put MANAGE_MESSAGES in place of ADMINISTRATOR 

  if(!args[0]) return functions.errorEmbed(message, message.channel, "Please input an emoji.");

  let emoji = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1])
  if(!emoji) return functions.errorEmbed(message, message.channel, "Please input a valid emoji.");

  console.log(emoji.url)

  // my brain isnt functioning

  } else return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.");
}

exports.help = {
    name: "steal-emojis",
    aliases: ['s-e','se'],
    description: 'Steals emojis from other servers.'
}