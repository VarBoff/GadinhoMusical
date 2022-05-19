const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const dotenv = require("dotenv");

dotenv.config();

const commands = [];
const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.APPSETTING_TOKEN);

// Applies commands to specified guild only
rest.put(
    Routes.applicationGuildCommands(
        process.env.APPSETTING_CLIENT_ID,
        process.env.APPSETTING_GUILD_ID
    ),
    { body: commands }
)
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
