const { Events } = require('discord.js');

const normalizedPath = require("path").join(__dirname, "../commands");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        require("fs").readdirSync(normalizedPath).forEach(function (file) {
            if (file.split('.')[0] === interaction.commandName)
                require("../commands/" + file).execute(interaction);
        });
    }
};
