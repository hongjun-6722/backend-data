const router = require('koa-router')();
// const userinfo = require('../controller/userinfo.js')
// const {login} = require('../controller/LoginController.js')
// const register = require('../controller/RegisterController.js').default
// const { searchindex } = require('../controller/Querysql')
const { logger, accessLogger } = require('../modules/logger');
const passport = require('koa-passport')

// 设置跨域和相应数据格式
router.use('/', async (ctx,next) =>  {
	ctx.set("Access-Control-Allow-Origin",ctx.request.header.origin);
	ctx.set("Access-Control-Allow-Credentials", "true")
    ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    ctx.set('Content-Type','application/json;charset=utf-8')
// // 	res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken")
// // 	res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization")
// // 	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
// // 	res.header("X-Powered-By",' 3.2.1')
	// if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
// 	else  next()
    await next();
});

router.use('/api/',(ctx,next) => { passport.authenticate('jwt',{session:false},
    async (err,user,info) => {
        // console.log(user)
        // console.log("err"+err)
        // console.log("info"+info)
        if(user){
            await next();
        } else {
            logger.error(info);
            ctx.redirect('/err')
        }
    }
)(ctx,next)})//验证token

router
    .get('/test',async (ctx) => {
        console.log("响应成功")
    })

    .get('/err',async (ctx) => {
        console.log("响应失败")
    })
    console.log(` URL : index`);

module.exports = router