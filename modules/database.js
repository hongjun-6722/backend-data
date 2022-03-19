const { NULL } = require('mysql/lib/protocol/constants/types');
const requireDirectory = require('require-directory')
const Sequelize = require('sequelize');
var config = require("../config/default").getconfig();

/**
 * 数据库初始化
 * 
 * @param  {[type]}   app       全局应用程序
 * @param  {Function} callback  回调函数
 * 
 */

function initialize(app, callback) {

    var sequelize = new Sequelize(config.database, config.user, config.password, {
        host: config.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        },
        timestamps: false,
    });

    try {

        global.database = sequelize;
        app.database = sequelize;

        // 加载模型
        requireDirectory(module, '../models', {
            visit: (obj) => {
                if (obj.modelName) {
                    sequelize.define(obj.modelName, obj.attributes, obj.options);
                }
            }
        });
        callback(null);

    } catch (error) {

        console.log('加载模型错误：'+err);
        callback(error);
        
    }

}

console.log("数据库连接参数 %s", config.database);

module.exports.initialize = initialize;

module.exports.getDatabase = function () {
    return global.database;
}