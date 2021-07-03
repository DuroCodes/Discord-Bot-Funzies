const Discord = require("discord.js");

module.exports = async (bot) => {

  console.log(`${bot.user.username} is online!`);
  bot.user.setPresence({
      status: 'idle',
      activity: {
          name: '-help',
          type: 'WATCHING',
          url: 'https://twitch.tv/'
      }
  })

} 
