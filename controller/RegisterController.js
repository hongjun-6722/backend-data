import { encryptPasswrodSync } from '../util/passwordUtil'
import genUid from '../util/uidUtil'
import User from '../dao/UserinfoDAO'

async function register(ctx) {

    const { body } = ctx.request;
    console.log(body);

    try {

        //检查request
        if (!body.username || !body.password) {
            ctx.status = 200;
            ctx.body = {
                type: "err",
                error: `账户名或密码传输失败`,
            }
            return;
        }

        //用户名检查
        var userinfo = await User.findOne({ username: body.username })
        console.log(userinfo)
        if (userinfo.obj) {
            ctx.status = 200;
            ctx.body = {
                type: "err",
                error: "用户名已存在"
            };
            return;
        }

        //加密密码
        var password = await encryptPasswrodSync(body.password);
        body.password = password;
        console.log("encrypt-password:" + password);

        //创建uid
        var uid;
        do {
            uid = genUid();
            var uiddata = await User.findOne({ userid: uid });
            console.log(uiddata)
        }
        while (uiddata.obj)
        console.log("uid:" + uid)
        body.userid = uid;
        body.id = 0;
        console.log(body)

        var createuser = {
            id: 0,
            userid: uid,
            username: body.username,
            userpassword: body.password,
            nickname: body.username,
            phonenumber: '13012345678'
        }

        //创建用户
        var data = await User.create(createuser)
        if (data.errmsg) {
            ctx.status = 200;
            ctx.body = { message: data.errmsg }
        } else {
            ctx.status = 200;
            ctx.body = {
                message: '注册成功',
                data: data.obj,
            }
        }

    } catch (error) {
        ctx.throw(error)
    }
}


module.exports = {
    'POST /register': register
}
