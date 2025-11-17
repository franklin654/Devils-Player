import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName('server').setDescription('Provides information about the server.'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({
            content: `This sever is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`,
            flags: MessageFlags.Ephemeral
        });
    },
};