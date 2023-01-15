const { EmbedBuilder } = require('discord.js');
const main = require('../main')

module.exports = {
    name: 'voiceStateUpdate',
    execute(oldState, newState) {
        const newUserChannel = newState.channelId
        const oldUserChannel = oldState.channelId

        if (newUserChannel === '842711254951133186') {
            console.log(newState.member.nickname + " joined " + newState.channel.name)
            const logEmbed = new EmbedBuilder()
                .setColor('ff00ff')
                .setTitle('Support logs')
                .setAuthor({name: newState.member.nickname, iconURL: newState.member.avatar})
                .setDescription(newState.member.nickname + " joined support channel")
                .setTimestamp()
                .setFooter({ text: 'LoIR Bot', iconURL: 'https://imgur.com/iOM0BSC.png' });

            newState.guild.channels.fetch('862066044449587250').then(channel => {
                channel.send({embeds: [logEmbed]})
            })
        }

    },
};
