import { verToken } from '../util/token';

async function tokentest(ctx) {
    const { body } = ctx.request
    try {
        if(body.token){
            var data = await verToken(body.token);
            ctx.status = 200;
            ctx.body = {
                "data":data,
            }; 
        } else {
            ctx.status = 401;
            ctx.body = {
                message: "未检出token"
            }; 
        }
    } catch (error) {
        throw(error)
    }
}

// /**
//  * token验证函数
//  * 
//  * @param  {[type]}   req  请求对象
//  * @param  {[type]}   res  响应对象
//  * @param  {Function} next 传递事件函数
//  */
//  module.exports.tokenAuth = function(req,res,next) {
// 	passport.authenticate('bearer', { session: false },function(err,tokenData) {
// 		if(err) return res.sendResult(null,400,'无效token');
// 		if(!tokenData) return res.sendResult(null,400,'无效token');
// 		req.userInfo = {};
// 		req.userInfo.uid = tokenData["uid"];
// 		req.userInfo.rid = tokenData["rid"];
// 		next();
// 	})(req, res, next);
// }

module.exports = {
    tokentest
}