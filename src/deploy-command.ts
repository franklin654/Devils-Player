require('dotenv').config();
import {REST, Routes} from 'discord.js';
import fs from 'fs'
// import Module from 'module';
import path from 'path';

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            console.log(command.data);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST().setToken(process.env.BOT_TOKEN!);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands`);

        // The put method to refresh all global commands
        const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {body: commands}) as any;

        // The put method to refresh a guild or server commands
        // const data = await rest.put(Routes.applicationGuildCommands(<client-id>, <guild-id>)), {body: commands});

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
