const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Retorna latência"),
    async execute(interaction) {
        //await interaction.reply("Pong!");
        await interaction.reply(
            `🏓 **| Pong!**\n\
            Latência do Server: **${
                m.createdTimestamp - message.createdTimestamp
            }ms.**\n\
            Latência da API: **${Math.round(client.ws.ping)}ms**`
        );
    },
};
