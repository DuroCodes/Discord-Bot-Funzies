const Discord = require("discord.js");
const fs = require("fs");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  const channel = message.mentions.channels.first();
  if(!channel) return functions.errorEmbed(message, message.channel, "Please input a channel.");

  args.shift()

  try{
    const json = JSON.parse(args.join(' '))
    const { plainText = '' } = json

    channel.send('', {
      embed: json
    })
  } catch(error){
    return functions.errorEmbed(message, message.channel, `Invalid JSON, create one here: https://embedbuilder.nadekobot.me/`);
  }

}

exports.help = {
    name: "embed-builder",
    aliases: ['emb', "embed"],
    description: "Create an embed."
}