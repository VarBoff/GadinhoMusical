const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Retorna latência!"),
    async execute(interaction) {
        const delay = Math.abs(Date.now() - interaction.createdTimestamp);

        await interaction.reply(`**Pong!**\nLatência: **${delay}ms**\nTa quebrado`);
    },
};
