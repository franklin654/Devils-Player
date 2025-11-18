import { Player } from "discord-player";
import { TextChannel } from "discord.js";

export const registerPlayerEvents = (player: Player) => {
    // Registering Basic Player Events
    player.events.on('audioTrackAdd', (queue, track) => {
    // Emitted when the player adds a single song to its queue
    queue.metadata.channel.send(`Track **${track.title}** queued`);
    });
    
    player.events.on('audioTracksAdd', (queue, track) => {
    // Emitted when the player adds multiple songs to its queue
    queue.metadata.channel.send(`Multiple Track's queued`);
    });
    
    player.events.on('playerSkip', (queue, track) => {
    // Emitted when the audio player fails to load the stream for a song
    queue.metadata.channel.send(`Skipping **${track.title}** due to an issue!`);
    });
    
    player.events.on('disconnect', (queue) => {
    // Emitted when the bot leaves the voice channel
    queue.metadata.channel.send('Looks like my job here is done, leaving now!');
    });
    player.events.on('emptyChannel', (queue) => {
    // Emitted when the voice channel has been empty for the set threshold
    // Bot will automatically leave the voice channel with this event
    queue.metadata.channel.send(`Leaving because no vc activity for the past 5 minutes`);
    });
    player.events.on('emptyQueue', (queue) => {
    // Emitted when the player queue has finished
    queue.metadata.channel.send('Queue finished!');
    });

    // Debug Events
    player.on('debug', async (message) => {
    // Emitted when the player sends debug info
    // Useful for seeing what dependencies, extractors, etc are loaded
    console.log(`General player debug event: ${message}`);
    });
    
    player.events.on('debug', async (queue, message) => {
    // Emitted when the player queue sends debug info
    // Useful for seeing what state the current queue is at
    console.log(`Player debug event: ${message}`);
    });

    // Error Events
    player.events.on('error', (queue, error) => {
    // Emitted when the player queue encounters error
    console.log(`General player error event: ${error.message}`);
    console.log(error);
    });
    
    player.events.on('playerError', (queue, error) => {
    // Emitted when the audio player errors while streaming audio track
    console.log(`Player error event: ${error.message}`);
    console.log(error);
    });
}