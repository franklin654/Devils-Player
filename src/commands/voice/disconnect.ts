import { useMainPlayer, usePlayer, useQueue } from "discord-player";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
                    .setName('disconnect')
                    .setDescription('disconnect audio player');

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const queue = useQueue();
    
    if (!queue) {
        return interaction.reply(`There is no active player session`);
    }
    
    queue.delete();
    return interaction.reply(`Player Stopped`);
}