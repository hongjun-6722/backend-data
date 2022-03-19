const Sequelize = require('sequelize');

module.exports.modelName = 'UserinfoModel';

module.exports.attributes = {
	id: {
		type:Sequelize.INTEGER(10),
		unique: true,
		primaryKey: true
	},
	userid : {
		type:Sequelize.STRING(10),
		unique: true,
		primaryKey: true
	},
	username : Sequelize.STRING(16),
	userpassword : Sequelize.STRING(64),
	nickname : Sequelize.STRING(16),
	phonenumber : Sequelize.STRING(11)
};

module.exports.options = {
	tableName : "userinfo",
	timestamps: false,
	freezeTableName: false
};
