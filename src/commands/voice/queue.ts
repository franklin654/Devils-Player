import { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { useQueue } from "discord-player";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Display the current queue'),
    async execute(interaction: ChatInputCommandInteraction) {
        interaction.deferReply();
        const queue = useQueue();

        if (!queue) {
            return interaction.reply(
                `This server does not have an active player session.`,
            );
        }

        const currentTrack = queue.currentTrack;

        const upcomingTracks = queue.tracks.store;

        const message = [
            `**Now Playing:** ${currentTrack?.title} - ${currentTrack?.author}`,
            '',
            '**Upcoming Tracks:**',
            ...upcomingTracks.map(
                (track, index) => `${index + 1}. ${track.title} - ${track.author}`,
            ),
        ].join('\n');

        return interaction.reply(message);
    }
}