import dotEnv from 'dotenv';
dotEnv.config();
import * as path from 'path';
import * as fs from 'fs';
import {
    Client, 
    Collection, 
    Events, 
    GatewayIntentBits, 
    Partials, 
    ActivityType, 
    PresenceUpdateStatus,
    type Interaction,
    ChatInputCommandInteraction,
    MessageFlags
} from 'discord.js';
import { Player } from 'discord-player';
import { DefaultExtractors } from '@discord-player/extractor';
import { generateOauthTokens, YoutubeiExtractor } from 'discord-player-youtubei';
import {registerPlayerEvents} from './playerEvent'


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
    ]
});

// Setting up the player
const player = new Player(client);
player.extractors.loadMulti(DefaultExtractors)
.then(success => {
    if (success)
        console.log('Player ready');
    else
        console.log('Player initialization failed');
})
.catch(error => console.error(error));
player.extractors.register(YoutubeiExtractor, {
    authentication: process.env.YT_TOKEN!,
    generateWithPoToken: true,
    streamOptions: {
        useClient: "WEB"
    }
});

// Creating a collection to store commands
client.commands = new Collection();

// Parsing and Adding commands to the client
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Registering Client Events
const clientEventFolder = path.join(__dirname, 'events', 'client');
const clientEventFiles = fs.readdirSync(clientEventFolder).filter(file => file.endsWith('.js'));
for (const file of clientEventFiles) {
        const filePath = path.join(clientEventFolder, file);
        const event = require(filePath);
        if ('eventName' in event && 'eventHandler' in event) {
            if (event.once)
                client.once(event.eventName, event.eventHandler);
            else
                client.on(event.eventName, event.eventHandler);
        } else {
            console.log(`[WARNING] The client event at ${filePath} is missing a required "eventName" or "eventHandler" property`);
        }
    }

// Registering the Player Events
registerPlayerEvents(player);

const playerEventFolder = path.join(__dirname, 'events', 'player');
if (!fs.existsSync(playerEventFolder))
    fs.mkdirSync(playerEventFolder, {
        recursive: true,
    });
const playerEventFiles = fs.readdirSync(playerEventFolder).filter(file => file.endsWith('.js'));
for (const file of playerEventFiles) {
    const filePath = path.join(playerEventFolder, file);
    const event = require(filePath);
    if ('eventName' in event && 'eventHandler' in event) {
        if (event.once)
            player.events.once(event.eventName, event.eventHandler);
        else
            player.events.on(event.eventName, event.eventHandler);
    } else {
        console.log(`[WARNING] The player event at ${filePath} is missing a required "eventName" or "eventHandler" property`)
    }
}

// starting the client
client.login(process.env.BOT_TOKEN);