var jwt = require("jsonwebtoken");
var config = require("../config/jwt_config").default;

/**
 * 验证token 异步
 * @param {string} token Token
 * @returns {string} jwt
 */

export const verTokenasync = function(token){
    
    return new Promise((resolve,reject) => {
        const info = jwt.verify(token,config.jwt.secret,function (err, decode) {
            if (err) {
                // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
                // console.log(err);
                // return err;
                reject(err);
            } else {
                // var data = decode
                // console.log(decode);
                // return data; 
                resolve(decode);
            }
        })
    })
}

/**
 * 验证token 同步
 * @param {string} token Token
 * @returns {string} jwt
 */

 export const verToken = function(token){
    
    return jwt.verify(token,config.jwt.secret,function (err, decode) {
            if (err) {
                // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
                // console.log(err);
                // return err;
                return(err);
            } else {
                // var data = decode
                // console.log(decode);
                // return data; 
                return(decode);
            }
        })
}

module.exports = {
    verTokenasync,verToken
}