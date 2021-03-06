const { MessageEmbed } = require("discord.js");
const { QueryType, QueueRepeatMode } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Toca um pancadão bem bom")
        .addStringOption((option) =>
            option
                .setName("musica")
                .setDescription("O bagulho q tu quer ouvir")
                .setRequired(true)
        ),
    async execute(interaction) {
        // Checks if user in vc
        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: "entra no voice primeiro bb",
                ephemeral: true,
            });

        const queue = interaction.client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel,
            },
        });

        try {
            if (!queue.connection)
                await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({
                content: "não deu, sei lá",
                ephemeral: true,
            });
        }

        // Creates a reply to guarantee we can answer later
        interaction.deferReply({
            content: "...",
        });

        const query = interaction.options.getString("musica");
        const track = await interaction.client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (!track || !track.tracks.length)
            return await interaction.editReply({
                content: `não achei nenhum **${track}**`,
            });

        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle("Adicionada!")
            .setDescription(
                `${
                    track.playlist
                        ? `Playlist: **${track.playlist.title}**`
                        : `Musica: **${track.tracks[0].title}**`
                } foi adicionada à fila`
            );
        if (!track.playlist) {
            embed.setThumbnail(track.tracks[0].thumbnail);
        }

        if (track.playlist) {
            queue.addTracks(track.tracks);
            await interaction.editReply({ embeds: [embed] });
        } else {
            queue.addTrack(track.tracks[0]);
            await interaction.editReply({ embeds: [embed] });
        }

        if (!queue.playing) await queue.play();
    },
};
