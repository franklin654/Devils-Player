import { ChatInputCommandInteraction, Events, Interaction, MessageFlags } from "discord.js";
import { useMainPlayer } from "discord-player";

module.exports = {
    eventName: Events.InteractionCreate,
    eventHandler: async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            const player = useMainPlayer();
            const data = {
                guild: interaction.guild!
            }
            await player.context.provide(data, () => command.execute(interaction as ChatInputCommandInteraction));
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral
                });
            }
        }
    }
};