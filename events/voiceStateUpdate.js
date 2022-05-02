module.exports = {
    name: "voiceStateUpdate",
    async execute(oldState, newState) {
        // excludes bot voice updates
        if (oldState.member.user.bot) return;

        //excludes muting and deafening
        if (oldState.mute != newState.mute || oldState.deaf != newState.deaf)
            return;

        if (newState.channelId === null) {
            console.log(
                `${new Date(Date.now()).toLocaleString()} - Usuario ${
                    oldState.member.user.username
                } saiu de ${oldState.channel.name}`
            );
        } else if (oldState.channelId === null) {
            console.log(
                `${new Date(Date.now()).toLocaleString()} - Usuario ${
                    newState.member.user.username
                } entrou em ${newState.channel.name}`
            );
        } else {
            console.log(
                `${new Date(Date.now()).toLocaleString()} - Usuario ${
                    newState.member.user.username
                } de ${oldState.channel.name} para ${newState.channel.name}`
            );
        }
    },
};
