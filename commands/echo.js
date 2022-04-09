const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('echos your input')
		.addStringOption((option) =>
			option
				.setName('input')
				.setDescription('the to be echoed')
				.setRequired(true),
		),
	async execute(interaction) {
		const reply = interaction.options.getString('input');

		if (reply === 'beep') {
			await interaction.reply('boop');
		}
		else {
			await interaction.reply(reply);
		}
	},

};