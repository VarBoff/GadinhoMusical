const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("novidades")
		.setDescription("Você se atreveria a descobrir?"),
	async execute(interaction) {
		await interaction.reply("Apenas em breve");
	},
};
