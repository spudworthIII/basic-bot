const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
	userID: { type: String, require: true, unique: true },
	serverID: { type: String, require: true },
	warnings: { type: Number, default: 0 },
});

const usermodel = mongoose.model('UserModels', UsersSchema);

module.exports = usermodel;