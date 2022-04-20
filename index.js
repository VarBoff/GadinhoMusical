const { token } = require('./config.json');

require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('🏓 **| Pong!**\nLatência do Server: **${m.createdTimestamp - \
      message.createdTimestamp}ms.**\nLatência da API: **${Math.round(\
      client.ws.ping )}ms**');
	} else if (commandName === 'novidades') {
    	await interaction.reply('Apenas em breve');
	}
});

client.login(token);
