const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnmember')
		.setDescription('warns mentioned user')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('user you want to warn')
				.setRequired(true),
		),
	async execute(interaction, Users) {
		if (interaction.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			const warneduser = interaction.option.getMember('target');
			console.log(warneduser);
			const user = await Users.findOne({ where: { user_id: warneduser } });
			if (user) {
				user.increment('warnings');
			}
			else {
				Users.create({
					user_id: warneduser,
					warnings: 1,
				});
			}
			await interaction.reply(`${warneduser} has been warned`);
		}
	},
};
// is yet to be working yet