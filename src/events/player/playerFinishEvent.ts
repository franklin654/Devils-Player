import { GuildQueue, GuildQueueEvent, Track } from "discord-player";

module.exports = {
    eventName: GuildQueueEvent.PlayerFinish,
    async eventHandler(queue: GuildQueue, track: Track) {
        const { channel } = queue.metadata as {channel: import('discord.js').VoiceChannel | import('discord.js').TextChannel}
        await channel.send(`Finished playing ${track.title}`);
    }
}