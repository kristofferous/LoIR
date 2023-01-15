const { Client, GatewayIntentBits, IntentsBitField, Intents} = require('discord.js');
const client = new Client({ intents: 37507})

require('dotenv').config()
const { REST, Routes } = require('discord.js');
const commandsFolder = './commands';
const fs = require('fs');
const path = require("path");
const eventsPath = path.join(__dirname, 'events');
const normalizedPath = require("path").join(__dirname, "commands");


const commands = [];

// For every file in commands dir, add to commands array
require("fs").readdirSync(normalizedPath).forEach(function(file) {
    commands.push(require("./commands/" + file).data)
});

const rest = new REST({ version: '10' }).setToken(process.env.SECRET_KEY);

//EVENT HANDLERS

const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands('1063145171581161533'), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.login(process.env.SECRET_KEY);

module.exports = client