const usermodel = require('../models/UsersSchema');

module.exports = async (cilent, discord, member) => {
	const userprofile = await usermodel.create({
		userID: member.id,
		serverID: member.guild.id,
		warnings: 0,
	});
	userprofile.save();
};