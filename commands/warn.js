const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const usermodel = require('../models/UsersSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('warns mentioned user')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('user you want to warn')
				.setRequired(true),
		),
	async execute(interaction) {
		if (interaction.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			const Warnuser = interaction.options.getMember('target');
			if (interaction.member == Warnuser) {
				console.log(Warnuser);
				await interaction.reply('you can\'t warn yourself');
			}
			else {
				try {
					const userdata = await usermodel.findOne({ userid: Warnuser.id });
					if (!userdata) {
						const newprofile = await usermodel.create({
							userID: Warnuser.id,
							serverid: interaction.guild.id,
							warns: 1,
						});
						newprofile.save();
						interaction.reply(Warnuser.username, 'has been warned for the first time');
					}
					else {
						// eslint-disable-next-line no-unused-vars
						const responce = await usermodel.findOneAndUpdate(
							{
								userID: Warnuser.id,
							},
							{
								$inc: {
									warns: 1,
								},
							},
						);
						interaction.reply(Warnuser.username, `has ${userdata.warns + 1 } warnings`);
					}
				}
				catch (err) {
					console.log(err);
				}
			}
		}
		else {
			await interaction.reply('you do not have permission to warn');
		}

	},
};
// kicks user if they have permissions