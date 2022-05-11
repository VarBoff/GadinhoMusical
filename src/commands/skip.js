const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Passa de musica, dj!"),

    async execute(interaction) {
        if (!interaction.member.voice.channel)
            return await interaction.reply({
                content: "tu nem ta no voice irmão, wtf",
                ephemeral: true,
            });

        if (
            interaction.guild.me.voice.channel &&
            interaction.member.voice.channel.id !==
                interaction.guild.me.voice.channel.id
        )
            return await interaction.reply({
                content: "se quer falar comigo entra na minha call, safadinho",
                ephemeral: true,
            });

        const player = interaction.client.player;
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return await interaction.reply({
                content: "skipar o q gata, nem tocando eu tô",
                ephemeral: true,
            });

        const currentTrack = queue.nowPlaying().title;
        const success = queue.skip();

        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle("Pulada!")
            .setDescription(`Musica: **${currentTrack}** foi skipada`);

        return await interaction.reply({
            embeds: success ? [embed] : [],
        });
    },
};
