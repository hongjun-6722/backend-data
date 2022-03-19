import { encryptPasswrodSync } from '../util/passwordUtil'
import genUid from '../util/uidUtil'
import User from '../dao/UserinfoDAO'

async function registertest(ctx) {
    
    const { body } = ctx.request;
    console.log(body);

    try {

        //检查request
        if (!body.username || !body.userpassword) {
            ctx.status = 400;
            ctx.body = {
              error: `账户名或密码传输失败`,
            }
            return;
        }

        //用户名检查
        var userinfo = await User.findOne({ username: body.username})
        if (userinfo.obj) {
            ctx.status = 401;
            ctx.body = { message: "用户名已存在" };
            return;
        }

        //加密密码
        var password = await encryptPasswrodSync(body.userpassword);
        body.userpassword = password; 
        console.log("encrypt-password:"+password);

        //创建uid
        var uid;
        do{
            uid = genUid();
            var uiddata = await User.findOne({ userid: uid });
            console.log(uiddata)
        } 
        while(uiddata.obj)
        console.log("uid:"+uid)
        body.userid = uid;
        body.id = 0;
        console.log(body)

        //创建用户
        var data = await User.create(body)
        if(data.errmsg){
            ctx.status = 402;
            ctx.body = { message: data.errmsg }
        } else {
            ctx.status = 200;
            ctx.body = {
                message: '注册成功',
                data:data.obj,
            }
        }
        
    } catch (error) {
      ctx.throw(error)
    }
}

export default {
    registertest
}
