const DAO = require("../dao/DAO");
const { Op } = require("sequelize");

/**
 * 
 * @param {Object} queryString
 * @param {Object} options
 * 
 */
module.exports.query = function(queryString) {
    
    var conditions = {
        where:{
            goods_name:{
                [Op.like]:`%${queryString}%`
            }
        }
    }

    var options = {
        limit:2
    };

	if(options){
		Object.assign(conditions,options)
	}

    return new Promise((resolve, reject)=>{

        DAO.findAll("GoodModel",conditions,function (errmsg, obj) {

			let data = new Object()
			data = {
				"errmsg":errmsg,
				"obj":obj
			}
            
            let sqldata = new Array();
            if(data.obj){
                data.obj.map((item)=>{
                    sqldata.push({"name":item.goods_name})
                })
                data.obj = sqldata;
                resolve(data);
            }else{
                resolve(data);
            }
        })

    })
}

module.exports.category = function() {
    
    var conditions = {}

    var options ={
        raw:true
    }

	if(options){
		Object.assign(conditions,options)
	}

    return new Promise((resolve)=>{

        DAO.findAll("ContentmeunModel",conditions,function (errmsg, obj) {

			let data = new Object()
			data = {
				"errmsg":errmsg,
				"obj":obj
			}
            resolve(data);
        })

    })
}