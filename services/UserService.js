const DAO = require("../dao/DAO");

/**
 * 检查用户名
 * 
 * @param {Object} queryString
 * @param {Object} options
 * 
 */
 
 module.exports.Checkusername = async function(queryString) {

    var conditions = {
        where:{
            username:queryString
        }
    }

    return new Promise ((resolve)=>{

       DAO.findOne("UserinfoModel",conditions,function (errmsg, obj) {
           let data = new Object()
           data = {
               "errmsg":errmsg,
               "obj":obj
           }
           resolve(data);
       })
   })
}