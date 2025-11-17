import { ChatInputCommandInteraction, Interaction, InteractionContextType, MessageFlags, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('user')
            .setDescription('Info about a user')
            .addUserOption(option => option.setName('target').setDescription('The user'))
        )
        .addSubcommand(subcommand => subcommand.setName('server').setDescription('Info about the server'))
        .setContexts(InteractionContextType.Guild),
    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');
            if (user) {
                await interaction.reply({
                    content: `Username: ${user.username}\nID: ${user.id}`,
                    flags: MessageFlags.Ephemeral
                });
            } else {
                await interaction.reply({
                    content: `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`,
                    flags: MessageFlags.Ephemeral
                });
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            await interaction.reply({
                content: `Sever name: ${interaction.guild?.name}\nTotal Numbers: ${interaction.guild?.memberCount}`,
                flags: MessageFlags.Ephemeral
            });
        }
    }
}