module.exports = (sequelize, Datatypes) => {
	return sequelize.define('users', {
		user_id: {
			type: Datatypes.STRING,
			primaryKey: true,
		},
		warnings: {
			type: Datatypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};