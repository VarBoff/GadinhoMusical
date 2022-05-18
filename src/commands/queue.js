const { MessageEmbed } = require("discord.js");
const { QueryType, QueueRepeatMode } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Mostra a fila toda"),

    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** - ${m.author}`;
        });

        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Fila`)
            .setDescription(
                `**Tocando - ${currentTrack.title}**\n
				${tracks.join("\n")}
                \n${
                    queue.tracks.length - tracks.length
                } outras musicas na fila!`
            );

        return interaction.reply({ embeds: [embed] });
    },
};
