import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('The channel to echo into'))
        .addBooleanOption(option => 
            option.setName('ephermal').setDescription('Whether or not the echo should be ephermal')
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({
            content: `${interaction.user.username}: ${interaction.options.getString('input')}`,
            ...(interaction.options.getBoolean('ephermal') && {flags: MessageFlags.Ephemeral})
        });
    }
}