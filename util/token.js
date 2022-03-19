var jwt = require("jsonwebtoken");
var config = require("../config/jwt_config").default;

/**
 * 加密密码（同步）
 * @param {string} token Token
 * @returns {string} jwt
 */

export const verToken = function(token){
    return new Promise((resolve) => {
        const info = jwt.verify(token,config.jwt.secret,function (err, decode) {
            if (err) {
                // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
                console.log(err);
                return err;
                // resolve(err);
            } else {
                console.log(decode);
                var data = decode
                // return data; 
                resolve(decode);
            }
        })
    })
}
