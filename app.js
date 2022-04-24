//服务器配置
const Koa = require('koa2')
const app = new Koa() // 创建koa2实例
const {errMiddleWare} = require('./modules/errorHandle')
const { logger, accessLogger } = require('./modules/logger');
const bodyParser = require('koa-bodyparser');
const wss = require('./modules/wss')
/**
 *
 * 公共系统初始化
 * 
 */
app.use(errMiddleWare)	//错误处理
app.use(accessLogger());	//错误log
app.use(bodyParser());	//解析body

const passport = require('koa-passport');
require("./modules/passport")(passport);
app.use(passport.initialize());	//用户授权初始化

const addControllers = require('./router/controller')
const apirouter = require('./router/index')
app.use(addControllers())
app.use(apirouter.routes()).use(apirouter.allowedMethods())//路由注册


// 初始化数据库模块
var database = require('./modules/database');
database.initialize(app,function(err) {
	if(err) {
		console.error("连接数据库失败失败 %s",err);
	} 
});

app.use(function(req, res, next) {
    console.log('404')
	res.sendResult(null,404,"Not Found");
})

app.on('error', err => {
	logger.error(err);
});  

//监听3000端口
// var server
global.server = app.listen(3000)
wss.serverinit()
console.log('listening at 3000')

module.exports = app

