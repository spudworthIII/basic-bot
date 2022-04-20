const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('bot will leave voice chat'),
	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel;

		if (!voiceChannel) return interaction.reply('you need to be in a voice channel to execute this');
		await voiceChannel.leave();
		await interaction.reply('leaving channel');
	},
};