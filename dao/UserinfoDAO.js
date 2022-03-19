var daoModule = require("./DAO");

/**
 * 通过查询条件获取管理员对象
 * 
 * @param  {[type]}   conditions 条件
 * @returns	{[object]} [string]errmsg,[object]obj
 */
 module.exports.findOne = async function(conditions) {
	 return new Promise ((resolve)=>{
		daoModule.findOne("UserinfoModel",conditions,function (errmsg, obj) {
			let data = new Object()
			data = {
				"errmsg":errmsg,
				"obj":obj
			}
            resolve(data);
		})
	})
}

/**
 * 添加管理员对象
 * 
 * @param  {[type]}   conditions 添加数据
 * @return  {[object]} data.errmsg,data.obj
 */
 module.exports.create = async function(conditions) {
	return new Promise ((resolve)=>{
		daoModule.create("UserinfoModel",conditions,function(errmsg,obj){
			let data = new Object();
			data = {
				"errmsg":errmsg,
				"obj":obj
			}
			resolve(data);
		});
	});
}

/**
 * 添加管理员对象
 * 
 * @param  {[type]}   conditions 添加数据
 * @param  {Function} cb         回调函数
 */
 module.exports.destroy = function(conditions,cb) {
	daoModule.destroy("UserinfoModel",conditions,cb);
}

/**
 * 修改管理员对象数据
 * 
 * @param  {[type]}   conditions 数据集
 * @param  {Function} cb         回调函数
 */
 module.exports.update = function(conditions,cb) {
	daoModule.update("UserinfoModel",conditions,cb);
}

/**
 * 查询多个管理员对象数据
 * 
 * @param  {[type]}   conditions 数据集
 * @param  {Function} cb         回调函数
 */
 module.exports.findAll = function(conditions,cb) {
	daoModule.findAll("UserinfoModel",conditions,cb);
}

/**
 * 查询筛选多个管理员对象数据
 * 
 * @param  {[type]}   conditions 数据集
 * @param  {Function} cb         回调函数
 */
 module.exports.list = function(conditions,cb) {
	daoModule.list("UserinfoModel",conditions,cb);
}

/**
 * 验证用户名是否被注册
 * 
 * @param  {[type]}   conditions 数据集
 * @param  {Function} cb         回调函数
 */
 module.exports.exists = function(conditions,cb) {
	daoModule.exists("UserinfoModel",conditions,cb);
}