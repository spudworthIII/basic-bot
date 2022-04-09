const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kicks mentioned user')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('user you want to kick')
				.setRequired(true),
		),
	async execute(interaction) {
		if (interaction.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			const user = interaction.options.getMember('target');
			if (interaction.member == user) {
				await interaction.reply('you can\'t kick yourself');
			}
			else {
				user.kick();
				await interaction.reply(`kicked user ${user}`);
			}
		}
		else {
			await interaction.reply('you do not have permission to kick');
		}

	},
};
// kicks user if they have permissions