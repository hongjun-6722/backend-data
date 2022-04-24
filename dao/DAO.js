var databaseModule = require("../modules/database"); 

/**
 * 获取所有数据并分页
 * @param  {[type]}   modelName  模型名称
 * @param  {[type]}   conditions 查询条件
 * 查询条件统一规范
 * conditions
	{
		"columns" : {
			字段条件
			"字段名" : "条件值"
		},
		"offset" : "偏移",
		"omit" : ["字段"],
		"only" : ["需要字段"],
		"limit" : "",
		"order" :[ 
			"字段" , A | Z,
			...
		]
	}
 * @param  {Function} cb         回调函数
 */

/**
 * 获取一条数据
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb(errmsg,obj)=>{}    回调函数
 */
 module.exports.findOne = function(modelName,conditions,cb) {
	 
	var db = databaseModule.getDatabase();
	var Model = db.models[modelName];
	if(!Model) return cb("模型不存在",null);
	if(!conditions) return  cb("条件为空",null);

	Model.findOne(conditions)
	.then( result => {
		if(result){
			cb(null,result.dataValues);
		} else {
			cb("查询条件错误",null);
		}
	})
	.catch( err => {
		return  cb("数据库获取出错！",null);
	});
}

/**
 * 增加一条数据
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
 module.exports.create = function(modelName,conditions,cb) {
	var db = databaseModule.getDatabase();
	var Model = db.models[modelName];
	if(!Model) return cb("模型不存在",null);
	if(!conditions) return  cb("条件为空",null);
	Model.create(conditions)
	.then(async (result) => {
		if(result){
			return  cb(null,result.dataValues);
		} else {
			return  cb("增加错误",null);
		}
	})
	.catch(err => {
		console.log(err)
		return  cb("数据库增加出错！",null);
	});
}

/**
 * 删除一条数据
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
 module.exports.destroy = function(modelName,conditions,cb) {
	var db = databaseModule.getDatabase();
	var Model = db.models[modelName];
	if(!Model) return cb("模型不存在",null);
	if(!conditions) return  cb("条件为空",null);
	Model.destroy({
		where: conditions,
	})
	.then(async (result) => {
		if(result){
			return  cb(null,"删除成功");
		} else {
			return  cb("删除条件错误",null);
		}
	})
	.catch(err => {
		console.log("DAO"+err)
		return  cb("数据库获取出错！",null);
	});
}

/**
 * 修改一条数据
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
 module.exports.update = function(modelName,conditions,cb) {

	var db = databaseModule.getDatabase();
	var Model = db.models[modelName];
	if(!Model) return cb("模型不存在",null);
	if(!conditions) return  cb("条件为空",null);

	let modifyingData = conditions.modifyingData
	let filtrate = conditions.filtrate

	if(!modifyingData) return  cb("需修改数据为空",null);
	if(!filtrate) return  cb("筛选条件为空",null);

	console.log("modifyingData:"+modifyingData)
	console.log("filtrate:"+filtrate)

	Model.update(modifyingData,{where: filtrate})
	.then( res => {
		if(res){
			return  cb(null,"修改成功");
		} else {
			return  cb("修改错误",null);
		}
	})
	.catch(err => {
		console.log("DAO:"+err)
		return  cb("数据库操作出错！",null);
	});
}

/**
 * 查询多条数据
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
 module.exports.findAll = function(modelName,conditions,cb) {

	var db = databaseModule.getDatabase();
	var Model = db.models[modelName];
	if(!Model) return cb("模型不存在",null);
	if(!conditions) return  cb("条件为空",null);

	Model.findAll(conditions)
	.then( res => {
		if(res){
			return  cb(null,res);
		} else {
			return  cb("查询错误",null);
		}
	})
	.catch(err => {
		console.log("DAO:"+err)
		return  cb("数据库操作出错！",null);
	});
}

/**
 * 搜索数据库中多个元素，同时返回数据和总数
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
 module.exports.findAndCountAll = function(modelName,conditions,cb){

	var db = databaseModule.getDatabase();
	var Model = db.models[modelName];
	if(!Model) return cb("模型不存在",null);
	if(!conditions) return  cb("条件为空",null);

	Model.findAndCountAll(conditions)
	.then( res => {
		if(res){
			console.log(res.count);
			console.log(res.rows);
			return  cb(null,res);
		} else {
			return  cb("查询错误",null);
		}
	})
	.catch(err => {
		console.log("DAO:"+err)
		return  cb("数据库操作出错！",null);
	});

 }

