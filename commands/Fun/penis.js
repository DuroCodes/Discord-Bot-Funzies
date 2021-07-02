const Discord = require("discord.js");

exports.run = async (bot, message, args, functions) => {

  if (message.mentions.members.first()) {
    let user = message.mentions.members.first();

      var size = Math.floor(Math.random() * Math.floor(7));
      var size2 = Math.floor(Math.random() * Math.floor(9))

    let penis = "8" + "=".repeat(size) + "D";

    const embed = new Discord.MessageEmbed()
      .setTitle("peepee size machine")
      .setDescription(
        user.displayName + "'s penis\n" + penis + "\n(" + size + "." + size2 + " inches)"
      )
      .setColor("RANDOM");

    return message.channel.send(embed);
  } else {
    let user = message.author;


      var size = Math.floor(Math.random() * Math.floor(7));
      var size2 = Math.floor(Math.random() * Math.floor(9))

    let penis = "8" + "=".repeat(size) + "D";

    const embed = new Discord.MessageEmbed()
      .setTitle("peepee size machine")
      .setDescription(
        user.username + "'s penis\n" + penis + "\n(" + size + "." + size2 + " inches)"
      )
      .setColor("RANDOM");

    return message.channel.send(embed);
  }
};

exports.help = {
    name: "pp",
    aliases: ["penis","ppsize","dicksize","dick"],
    description: "Displays user's penis size."
}