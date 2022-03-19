const router = require('koa-router')();
const userinfo = require('../controller/userinfo.js')
const login = require('../controller/LoginController.js').default
const register = require('../controller/RegisterController.js').default

const passport = require('koa-passport')

router.use('/a',(ctx,next) => { passport.authenticate('jwt',{session:false},
    async (err,user,info) => {
        console.log(user)
        console.log("err"+err)
        console.log("info"+info)
        if(user){
            await next();
        } else {
            ctx.redirect('/err')
        }
    }
)(ctx,next)})

router
    .post('/account/login',userinfo.login)
    .post('/account/register',userinfo.register)
    .post('/account/deleteManager',userinfo.deleteManager)
    .post('/account/updateManager',userinfo.updateManager)
    .post('/account/findAllManager',userinfo.findAllManager)

    .post('/logintest',login.logintest)
    .post('/registertest',register.registertest)
    
    .get('/a/testtoken',async (ctx) => {
        console.log("响应成功")
    })
    .get('/err',async (ctx) => {
        console.log("响应失败")
    })

module.exports = router