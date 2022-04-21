module.exports = {
	name: 'interactionCreate',
    async execute(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;
        
        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: `Erro! ${error}`,
                ephemeral: true,
            });
        }
    }
}