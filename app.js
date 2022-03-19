//服务器配置
const Koa = require('koa2')
const app = new Koa() // 创建koa2实例

const bodyParser = require('koa-bodyparser');
const cors = require("koa-cors")
const passport = require('koa-passport');
/**
 *
 * 公共系统初始化
 * 
 */

app.use(bodyParser());
app.use(cors());

require("./config/passport")(passport);
app.use(passport.initialize());
// app.use(passport.session());

const apirouter = require('./router/index.js')
app.use(apirouter.routes()).use(apirouter.allowedMethods())

const errMiddleWare = require('./config/errorHandle').default
app.use(errMiddleWare)

// 初始化数据库模块
var database = require('./modules/database');
database.initialize(app,function(err) {
	if(err) {
		console.error("连接数据库失败失败 %s",err);
	} 
});

app.use(async (ctx) => {
	ctx.status = 404
    ctx.body = '404'
    console.log('404')
})

//监听3000端口
app.listen(3000)
console.log('listening at 3000')

module.exports = app

