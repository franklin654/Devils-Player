import { GuildQueue, GuildQueueEvent, Track } from "discord-player";

module.exports = {
    eventName: GuildQueueEvent.PlayerStart,
    async eventHandler(queue: GuildQueue, track: Track) {
        interface PlayerQueueMetadata {
            channel: import("discord.js").TextChannel | import("discord.js").VoiceChannel | null;
        }
        const { channel } = queue.metadata as PlayerQueueMetadata;
        await channel?.send(`Now playing: ${track.title}`);
    }
}