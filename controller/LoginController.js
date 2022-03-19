import User from '../dao/UserinfoDAO'
import { checkPasswrod } from '../util/passwordUtil'
import config from '../config/jwt_config';
import jwt from 'jsonwebtoken';

async function logintest(ctx) {

    const { body } = ctx.request
    console.log(ctx.isAuthenticated())
    try {

    //检查用户名
    var user = await User.findOne({ username: body.username });
    console.log(user)
    if(user.errmsg){
        ctx.status = 401;
        ctx.body = {
            message: "用户名未注册"
        }; 
        return;
    }

    //   匹配密码
      if (await checkPasswrod(body.password, user.obj.userpassword)) {
        var token=jwt.sign({
          // data: user.obj.nickname,
          username: body.username,
          // 设置 token 过期时间
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
        }, config.jwt.secret);
        ctx.status = 200
        ctx.body = {
          message: '登录成功',
          // user: user.nickname,
          // 生成 token 返回给客户端
          token: 'Bearer ' + token,
        }
      } else {
        ctx.status = 401
        ctx.body = {
          message: '密码错误',
        }
      }
    } catch (error) {
      ctx.throw(error)
    }
}

export default {
  logintest
}