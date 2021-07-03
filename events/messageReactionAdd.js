const Discord = require('discord.js');
const functions = require("../functions/functions.js");
const dateFormat = require('dateformat');
const db = require('quick.db');
const fs = require('fs');
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

module.exports = async (bot, reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();

  let message = reaction.message;
  if(!message) return;
  if(user.bot) return;

  let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

  let already = new Discord.MessageEmbed()
  .setColor(color.red)
  .setAuthor(`⛔ | Oh no ..`)
  .setDescription(`You can only have one ticket open at a time.`);

  let success = new Discord.MessageEmbed()
  .setColor('#C0142F')
  .setTitle(`🎟️ | Ticket System`)
  .setDescription(`Hello <@${user.id}> our staff team will be with you soon!\nIn the meantime please describe your issue further!`)
  .setFooter('Ticket System', bot.user.displayAvatarURL())
  .setTimestamp();

  let split = '';
  let usr = user.id.split(split);
  for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

  if(message.embeds.length === 1 && message.embeds[0].title === 'Ticket System' && message.embeds[0].description === 'React with 🎟️ to create a ticket.'){
    if(reaction.emoji.name === "🎟️"){
      if(!message.guild.channels.cache.find(c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)){

        let role = message.guild.roles.cache.find(r => r.name === "Ticket Support");
        if(!role) {
          message.guild.roles.create({data:{name: "Ticket Support", permissions: 0}, reason: 'Staff need this role to view tickets.'});
          message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({timeout: 5000}).catch(e => {}));
          reaction.users.remove(user.id);
          return
        }
        let categoria = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
        if(!categoria) categoria = await message.guild.channels.create("tickets", {type: "category", position: 1}).catch(e => {return functions.errorEmbed(message, message.channel, "An error has occurred.")});

        let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

        message.guild.channels.create(`ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { permissionOverwrites:[
          {
            deny: 'VIEW_CHANNEL',
            id: message.guild.id
          },
          {
            allow: permsToHave,
            id: user.id
          },
          {
            allow: permsToHave,
            id: role.id
          },
        ],
        parent: categoria.id,
        reason: `This user needs help`,
        topic: `**ID:** ${user.id} -- **Tag:** ${user.tag} | -close`
      }).then(channel => {

        let createdEmbed = new Discord.MessageEmbed()
        .setAuthor(`📝 | Ticket Open`)
        .setTimestamp()
        .setColor(color.none)
        .setFooter(`Ticket System`, bot.user.displayAvatarURL())
        .setDescription(`A user has opened a ticket and is waiting for their request to be handled.`)
        .addField(`Information`, `**User :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** ${channel}\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);

        const ticketsupport = message.guild.roles.cache.find(r => r.name === "Ticket Support");
        if(logsChannel) logsChannel.send(createdEmbed);
        channel.send(`${ticketsupport}`, {embed: success});
        db.set(`ticket.ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { user: user.id });
      })
      reaction.users.remove(user.id);
      return;
    } else {
      reaction.users.remove(user.id);
      message.reply({embed: already}).then(m => m.delete({timeout: 5000}).catch(e => {}));
    }
    } else {
      reaction.users.remove(user.id);
    }
  }

  // ========================= //

  if(message.embeds.length === 1 && message.embeds[0].title === '🎟️ | Ticket Completed' && message.embeds[0].description === `React with 🗑️ to close the ticket or do not react if you have other requests.`){
    if(reaction.emoji.name === "🗑️"){
      if(user.id === db.get(`ticket.${message.channel.name}.user`)){

        let deletedEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Closed`)
        .setColor(color.none)
        .setDescription(`The author has confirmed the ticket has been closed.`)
        .setTimestamp()
        .setFooter(`Tickey System`, bot.user.displayAvatarURL())
        .addField(`Information`, `**User :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        if(logsChannel) logsChannel.send(deletedEmbed);

        message.channel.delete();

      }
    }
  }

}
