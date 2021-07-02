const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));
const { MessageButton } = require("discord-buttons");
const snekfetch = require("snekfetch");
const MinecraftAPI = require('minecraft-api');
const mine = require("minecraft-user");

exports.run = async (bot, message, args, functions) => {

    if(!args[0]) return functions.errorEmbed(message, message.channel, "Please provide a username.");

		const msg = message.reply('Gathering Hypixel Bedwars Statistics...');

		MinecraftAPI.uuidForName(args[0]).then(uuid => {
			const apikey = '41ffa422-7d65-4338-88cd-76dfc81c23e0';
			const apiurl = `https://api.hypixel.net/player?key=${apikey}&uuid=${uuid}`;
				snekfetch.get(apiurl).then(async r => {
				let player = r.body.player;
				const stats = player.stats.Bedwars;
				const user = await mine.getUser(uuid);
				let plrembed = new Discord.MessageEmbed()
				.setTitle(`Bedwars Statistics of user ${args[0]}`)
				.setDescription('This displays the users bedwars stats. **Undefined = 0**')
				.addField(`**Win Streak** - `, stats.winstreak, true)
				.addField(`**Experience** - `, stats.Experience, true)
				.addField(`**Coins** - `, stats.coins, true)
				.addField(`**Level - Star Level**`, player.achievements.bedwars_level, true)
				.addField(`**In Total Beds Broken** -`, stats.beds_broken_bedwars, true)
				.addField(`**In Total Deaths** - `, stats.deaths_bedwars, true)
				.addField(`**In Total Games Played** - `, stats.games_played_bedwars, true)
				.addField(`**In Total Games Won** - `, stats.wins_bedwars, true)
				.addField(`**In Total Games Lost** - `, stats.losses_bedwars, true)
				.addField(`**In Total Beds Lost** -`, stats.beds_lost_bedwars, true)
				.addField(`**In Total Iron Collected** -`, stats.iron_resources_collected_bedwars, true)
				.addField(`**In Total Gold Collected** -`, stats.gold_resources_collected_bedwars, true)
				.addField(`**4v4v4v4 Stats**`, `Kills - ${stats.four_three_kills_bedwars}\nFinal Kills - ${stats.four_four_final_kills_bedwars}\nDeaths - ${stats.four_four_deaths_bedwars}\nFinal Deaths - ${stats.four_four_final_deaths_bedwars}\nBeds Broken - ${stats.four_four_beds_broken_bedwars}\nGames Played - ${stats.four_four_games_played_bedwars}\nTotal Wins - ${stats.four_four_wins_bedwars}`, true)
				.addField(`**3v3v3v3 Stats**`, `Kills - ${stats.four_three_kills_bedwars}\nFinal Kills - ${stats.four_three_final_kills_bedwars}\nDeaths - ${stats.four_three_deaths_bedwars}\nFinal Deaths - ${stats.four_three_final_deaths_bedwars}\nBeds Broken - ${stats.four_three_beds_broken_bedwars}\nGames Played - ${stats.four_three_games_played_bedwars}\nTotal Wins - ${stats.four_three_wins_bedwars}`, true)
				.addField(`**Duos Stats**`, `Kills - ${stats.eight_two_kills_bedwars}\nFinal Kills - ${stats.eight_two_final_kills_bedwars}\nDeaths - ${stats.eight_two_deaths_bedwars}\nFinal Deaths - ${stats.eight_two_final_deaths_bedwars}\nBeds Broken - ${stats.eight_two_beds_broken_bedwars}\nGames Played - ${stats.eight_two_games_played_bedwars}\nTotal Wins - ${stats.eight_two_wins_bedwars}`, true)
				.addField(`**Solo Stats**`, `Kills - ${stats.eight_one_kills_bedwars}\nFinal Kills - ${stats.eight_one_final_kills_bedwars}\nDeaths - ${stats.eight_one_deaths_bedwars}\nFinal Deaths - ${stats.eight_one_final_deaths_bedwars}\nBeds Broken - ${stats.eight_one_beds_broken_bedwars}\nGames Played - ${stats.eight_one_games_played_bedwars}\nTotal Wins - ${stats.eight_one_wins_bedwars}`, true)
				.setColor("GREEN")
				.setThumbnail(await user.head)
				.setFooter('Gathered from the Hypixel API, data is not outdated. - Undefined means 0, fixing that and if it just keeps loading it means they have not played.')
				 setTimeout(function() { message.reply(plrembed); }, 1500);
			});
		});

}

exports.help = {
    name: "bw-stats",
    aliases: ['bw', 'bedwars'],
    description: "Returns a user's bedwars stats."
}