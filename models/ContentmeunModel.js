const Sequelize = require('sequelize');

module.exports.modelName = 'ContentmeunModel';

module.exports.attributes = {
		id : {type: 'serial', primaryKey: true},
		cat_name : String,
		cat_pid : Number,
		cat_level : Number,
		cat_icon : String,
		cat_src : Number,
	};
module.exports.options ={
    tableName : "contentmenu",
	timestamps: false,
	freezeTableName: false
}