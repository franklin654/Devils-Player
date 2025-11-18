import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { useQueue } from "discord-player";

exports.data = new SlashCommandBuilder()
.setName('skip')
.setDescription('Skip the currently playing song');

exports.execute = async (interaction: ChatInputCommandInteraction) => {
    const queue = useQueue();

    if (!queue) {
        return interaction.reply(
            'This server does not have an active player session.',
        );
    }

    if (!queue.isPlaying()) {
        return interaction.reply('There is no track playing.');
    }

    const track = queue.currentTrack;

    queue.node.skip();

    return interaction.reply(`The ${track?.title} has been skipped.`);
}