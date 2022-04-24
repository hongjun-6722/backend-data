const fs = require('fs')
const path = require('path')
const router = require('koa-router')();

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
        if(user){
            await next();
        } else {
            logger.error(info);
            ctx.redirect('/err')
        }
    }
)(ctx,next)})//验证token

function addControllers(){

    var files = fs.readdirSync(path.join(process.cwd(), '/controller'))

    var js_files = files.filter((f)=>{
        return f.endsWith('.js');
    });
    
    for (var f of js_files) {
        // console.log(`process controller: ${f}...`);
        let mapping = require(process.cwd() + '/controller/' + f);
        for (var url in mapping) {
            if (url.startsWith('GET ')) {
                var address = url.substring(4);
                router.get(address, mapping[url]);
                console.log(` URL : GET ${address}`);
            } else if (url.startsWith('POST ')) {
                var address = url.substring(5);
                router.post(address, mapping[url]);
                console.log(` URL : POST ${address}`);
            } else {
                // 无效的URL:
                console.log(`invalid URL: ${url}`);
            }
        }
    }
}



module.exports = function() {
    addControllers();
    return router.routes();
}