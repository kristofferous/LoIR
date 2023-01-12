module.exports = {
    name: 'voiceStateUpdate',
    execute(oldState, newState) {
        const newUserChannel = newState.channelId
        const oldUserChannel = oldState.channelId

        if (newUserChannel) console.log("User joined channel ...")
    },
};
