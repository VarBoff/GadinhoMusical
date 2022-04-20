const { token } = require("./config.json");
const Discord = require("discord.js");
const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: `Erro! ${error}`,
            ephemeral: true,
        });
    }
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);
