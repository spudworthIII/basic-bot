const { SlashCommandBuilder } = require('@discordjs/builders');
const usermodel = require('../models/UsersSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showwarnings')
		.setDescription('shows the number of warnings of a user')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('user you want to show warnings')
				.setRequired(true),
		),
	async execute(interaction) {
		const Warnuser = interaction.options.getMember('target');


		try {
			const userdata = await usermodel.findOne({ userid: Warnuser.id });
			if (!userdata) {
				const newprofile = await usermodel.create({
					userID: Warnuser.id,
					serverid: interaction.guild.id,
					warns: 0,
				});
				newprofile.save();
				interaction.reply(Warnuser.username, 'has 0 warnings');
			}
			else {
				// eslint-disable-next-line no-unused-vars

				interaction.reply(Warnuser.username, `has ${userdata.warns} warnings`);
			}
		}
		catch (err) {
			console.log(err);
		}


	},
};
// kicks user if they have permissions