const { token } = require("./config.json");
const Discord = require("discord.js");
const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");

const client = new Discord.Client({
	intents: [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_VOICE_STATES",
		"GUILD_MESSAGES",
	],
});

// Command Handling
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Event Handling
const eventFiles = fs.readdirSync("./events");

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
