const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

    if(!message.channel.name.startsWith(`ticket-`)) return;
    
    if(message.author.id === db.get(`ticket.${message.channel.name}.user`)) {
    
      let userEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️ | Ticket Closed`)
      .setColor(color.none)
      .setDescription(`The author of the ticket has closed it.`)
      .setTimestamp()
      .setFooter(`Ticket System`, bot.user.displayAvatarURL())
      .addField(`Information`, `**User :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);
    
      db.delete(`ticket.${message.channel.name}`);
      if(logsChannel) await logsChannel.send(userEmbed);
      await message.channel.delete();
    } else {
    
      let support = message.guild.roles.cache.find(r => r.name === "Ticket Support");
      if(!support) return functions.errorEmbed(message, message.channel, "The Role `Ticket Support` does not exist, please create it.");
      if(message.deletable) message.delete();
    
      if(args[0] === "force"){
    
        // let forceEmbed = new Discord.MessageEmbed()
        // .setAuthor(`🗑️ | Ticket Closed`)
        // .setColor(color.none)
        // .setDescription(`A member of the role ${support} force-deleted a ticket.`)
        // .setTimestamp()
        // .setFooter(`Ticket System`, bot.user.displayAvatarURL())
        // .addField(`Information`, `**User :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);
    
        // let embed1 = new Discord.MessageEmbed()
        // .setAuthor(`📥 | Ticket Closed`)
        // .setColor(color.blue)
        // .setDescription(`\`${message.author.tag}\` forced your ticket to close.`);
        // db.delete(`ticket.${message.channel.name}`);
        // if(logsChannel) await logsChannel.send(forceEmbed);
        // if(bot.users.cache.get(db.get(`ticket.${message.channel.name}.user`))) bot.users.cache.get(db.get(`ticket.${message.channel.name}.user`)).send(embed1).catch(e => {console.log(e)})
        // message.channel.delete();
        
    
      } else {
    
        let staffEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️| Closure Request`)
      .setColor(color.none)
      .setDescription(`A member of the role ${support} requested the ticket to be closed.`)
      .setTimestamp()
      .setFooter(`Ticket System`, bot.user.displayAvatarURL())
      .addField(`Information`, `**User :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);
    
        if(!message.guild.member(message.author).roles.cache.has(support.id)) return functions.errorEmbed(message, message.channel, "Sorry, you don't have the `Ticket Support` role`.");

        let reason = args.join(" ");
        let creator = db.get(`ticket.${message.channel.name}.user`)


        let forceEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Closed`)
        .setColor(color.none)
        .setDescription(`A member of the role ${support} force-deleted a ticket with the reason.`)
        .setTimestamp()
        .setFooter(`Ticket System`, bot.user.displayAvatarURL())
        .addField(`Information`, `**Closed by :** \`${message.author.tag}\`\n**Creator ID : ** \`${creator}\`\n**Reason :** \`${reason}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);


        let embed2 = new Discord.MessageEmbed()
        .setColor(color.green)
        .setTitle(`🎟️ | Ticket Completed`)
        .setDescription(`React with 🗑️ to close the ticket or do not react if you have other requests.`);
        // if(logsChannel) await logsChannel.send(staffEmbed);
        // message.channel.send(embed2).then(m => m.react(`🗑️`));
        logsChannel.send(forceEmbed);
        message.channel.delete();
      }
    
    }

}

exports.help = {
    name: "close",
    aliases: ["c"],
    description: "Closes a ticket."
}