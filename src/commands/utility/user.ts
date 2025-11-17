import { ChatInputCommandInteraction, GuildMember, MessageFlags, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply(
            {
                content: `This command was run by ${interaction.user.username}, who joined on ${(interaction.member as GuildMember).joinedAt}.`,
                flags: MessageFlags.Ephemeral
            }            
        );
    }
};