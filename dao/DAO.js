var databaseModule = require("../modules/database"); 

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
	Model.findOne({
		where: conditions,
	})
	.then( result => {
		if(result){
			return  cb(null,result.dataValues);
		} else {
			return  cb("查询条件错误",null);
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

	Model.findAll({where: conditions})
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
module.exports.list = function(modelName,conditions,cb) {
	var db = databaseModule.getDatabase();

	var model = db.models[modelName];

	if(!model) return cb("模型不存在",null);



	if(conditions) {
		if(conditions["columns"]) {
			model = model.find(conditions["columns"]);
		} else {
			model = model.find();
		}

		if(conditions["offset"]) {
			model = model.offset(parseInt(conditions["offset"]));
		}

		if(conditions["limit"]) {
			model = model.limit(parseInt(conditions["limit"]));
		}

		if(conditions["only"]) {
			model = model.only(conditions["only"]);
		}

		if(conditions["omit"]) {
			model = model.omit(conditions["omit"]);
		}

		if(conditions["order"]) {
			model = model.order(conditions["order"]);
		}

	} else {
		model = model.find();
	}

	model.run(function(err,models) {
		
		if(err) {
			console.log(err);
			return cb("查询失败",null);
		}
		cb(null,models);
	});
};

/**
 * 查询指定列项数
 * @param  {[type]}   modelName  模型名称
 * @param  {[数组]}   conditions  条件集合
 * @param  {Function} cb         回调函数
 */
module.exports.countByConditions = function(modelName,conditions,cb) {
	var db = databaseModule.getDatabase();

	var model = db.models[modelName];

	if(!model) return cb("模型不存在",null);

	var resultCB = function(err,count){
		if(err) {
			return cb("查询失败",null);
		}
		cb(null,count);
	}

	if(conditions) {
		if(conditions["columns"]) {
			model = model.count(conditions["columns"],resultCB);
		} else {
			model = model.count(resultCB);
		}

	} else {
		model = model.count(resultCB);
	}

};
	
/**
 * 通过主键ID获取对象
 * @param  {[type]}   modelName 模型名称
 * @param  {[type]}   id        主键ID
 * @param  {Function} cb        回调函数
 */
 module.exports.show = function(modelName,id,cb) {
	var db = databaseModule.getDatabase();
	var Model = db.models[modelName];
	Model.get(id,function(err,obj){
		cb(err,obj);
	});
}


/**
 * 通过条件判断数据是否存在
 * 
 * @param  {[type]}   modelName  模块名
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
 module.exports.exists = function(modelName,conditions,cb) {
	var db = databaseModule.getDatabase();
	var Model = db.models[modelName];
	Model.exists(conditions,function(err,isExists){
		if(err) return cb("查询失败");
		 cb(null,isExists);
	});
}

module.exports.getModel = function(modelName) {
	var db = databaseModule.getDatabase();
	return db.models[modelName];
}