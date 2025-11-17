import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

module.exports =  {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction: ChatInputCommandInteraction) {
        const creation_time = interaction.createdTimestamp;
        const response = await interaction.reply({
            content: `Pong! 🏓`, withResponse: true, flags: MessageFlags.Ephemeral
        });
        const latency = response.resource?.message?.createdTimestamp! - creation_time;
        interaction.followUp({
            content: `Latency: ${latency}ms`, flags: MessageFlags.Ephemeral
        });
    }
}