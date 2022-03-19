var UserinfoDAO = require("../dao/UserinfoDAO");

/**
 * 管理员登录
 * @param  {[type]}   username 用户名
 * @param  {[type]}   password 密码
 */
 module.exports.login = function(username,password) {
	
	return new Promise((resolve, reject)=>{

		UserinfoDAO.findOne({"username":username,"userpassword":password},function(err,dataObj) {
			let data;
			if(err){
				reject(err);
			} else {
				data = { 
					msg : null,
					obj : {	
						"id":dataObj.id,
						"userid":dataObj.userid,
						"username":dataObj.username,
						"nickname":dataObj.nickname,
						"mobile":dataObj.phonenumber,
					}
				}
				resolve(data);
			}
		});
	
	})
}

/**
 * 管理员增加
 * @param  {[type]}   obj 管理员数据
 * 
 */
 module.exports.register = function(obj) {
	
	return new Promise((resolve, reject)=>{

		UserinfoDAO.create(obj,function(err,obj) {
			let data;
			if(err){
				console.log(err)
				reject(err);
			} else {
				data = {
					msg : "新增完成",
				}
				resolve(data);
			}
		});
	
	})
}

/**
 * 管理员删除
 * @param  {[type]}   obj     筛选管理员条件
 */
 module.exports.deleteManager = function(obj) {
	
	return new Promise((resolve, reject)=>{

		UserinfoDAO.destroy(obj,function(err,obj) {
			let data;
			if(err){
				reject(err);
			} else {
				data = { 
					msg : "删除成功",
				}
				resolve(data);
			}
		});
	
	})
}

/**
 * 查询多个管理员
 * @param  {[type]}   obj     筛选管理员条件
 */
module.exports.findAllManager = function(obj) {
	
	return new Promise((resolve, reject)=>{

		UserinfoDAO.findAll(obj,function(err,obj) {
			if(err){
				reject(err);
			} else {
				resolve(obj);
			}
		});
	
	})
}

/**
 * 修改管理员数据
 * @param  {[type]}   obj     筛选管理员条件
 */
module.exports.updateManager = function(obj) {
	
	return new Promise((resolve, reject)=>{

		UserinfoDAO.update(obj,function(err,obj) {
			if(err){
				reject(err);
			} else {
				resolve(obj);
			}
		});
	
	})
}