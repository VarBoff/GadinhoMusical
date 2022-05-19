const Discord = require("discord.js");
const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");
const { Player } = require("discord-player");
const dotenv = require("dotenv");

dotenv.config();

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES",
    ],
});

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
});

// Command Handling
client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Event Handling
const eventFiles = fs
    .readdirSync("./src/events")
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, async (...args) => await event.execute(...args));
    }
}

client.login(process.env.APPSETTING_TOKEN);
