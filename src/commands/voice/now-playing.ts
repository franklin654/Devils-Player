import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Track, useQueue } from "discord-player";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Display the currently playing song'),
    async execute(interaction: ChatInputCommandInteraction) {
        const queue = useQueue();

        if (!queue) {
            return interaction.reply(
                'This server does not have an active player session.',
            );
        }

        const currentSong = queue.currentTrack;

        if (!currentSong) {
            return interaction.reply(`No song is currently playing.`)
        }

        return interaction.reply({
            content: `Now Playing: ${currentSong.title}`,
        })
    }
}