import { channel } from "diagnostics_channel";
import { useMainPlayer } from "discord-player";
import { ChatInputCommandInteraction, GuildMember, MessageFlags, PermissionsBitField, SlashCommandBuilder } from "discord.js";

exports.data = new SlashCommandBuilder()
        .setName('play') // Command Name
        .setDescription('Play a song in a voice channel') // Command Description
        .addStringOption(option => 
                option
                .setName('song')
                .setDescription('The song to play')
                .setRequired(true),
        )

exports.execute = async (interaction: ChatInputCommandInteraction) => {
    const player = useMainPlayer();
    const query = interaction.options.getString('song', true);

    const voiceChannel = (interaction.member as GuildMember).voice.channel;

    if (!voiceChannel) {
        return interaction.reply({ content: `You need to be in a voice channel to play music!`, flags: MessageFlags.Ephemeral,});
    }

    if (interaction.guild?.members.me?.voice.channel && interaction.guild.members.me.voice.channel !== voiceChannel) {
        return interaction.reply('I am already playing in a different voice channel!', );
    }

    if (!voiceChannel?.permissionsFor(interaction.guild?.members.me!)?.has(PermissionsBitField.Flags.Connect)) {
        return interaction.reply(
            'I do not have permission to join your voice channel!',
        );
    }

    if (!voiceChannel
        .permissionsFor(interaction.guild?.members.me!)
        .has(PermissionsBitField.Flags.Speak)
    ) {
        return interaction.reply('I do not have permissions to speak in your voice channel!',);
    }

    await interaction.deferReply()
    const result = await player.play(voiceChannel, query, {
        nodeOptions: {metadata: {channel: interaction.channel},}
    });
    return interaction.editReply(
        `${result.track.title} has been added to the queue!`,
    );
}