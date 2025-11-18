import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { useQueue, useTimeline } from "discord-player";

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('toogle pause of the current playing song.'),
    async execute(interaction: ChatInputCommandInteraction) {
        const timeline = useTimeline();

        if (!timeline) {
            return interaction.reply(
                'This server does not have an active player session.',
            );
        }

        const wasPaused = timeline.paused;

        wasPaused ? timeline.resume() : timeline.pause();

        return interaction.reply(
            `The player is now ${wasPaused? 'playing': 'paused'}`
        )
    }
}