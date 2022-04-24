import User from '../services/UserService'
import { checkPasswrod } from '../util/passwordUtil'
import config from '../config/jwt_config';
import jwt from 'jsonwebtoken';

async function login(ctx) {

  var { body } = ctx.request;
  console.log(body);

  try {
    //检查request
    if (!body.username || !body.password) {
      ctx.status = 400;
      ctx.body = {
        error: `账户名或密码传输失败`,
      }
      return;
    }

    //检查用户名
    var user = await User.Checkusername(body.username);
    if (user.errmsg) {
      ctx.status = 400;
      ctx.body = {
        message: "用户名未注册"
      };
      return;
    }

    //   匹配密码
    if (await checkPasswrod(body.password, user.obj.userpassword)) {
      var token = jwt.sign({
        user: {
          "userid": user.obj.userid,
          "nickname": user.obj.nickname
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
      }, config.jwt.secret);
      ctx.status = 200
      ctx.body = {
        status: "200",
        message: '登录成功',
        user: {
          "userid": user.obj.userid,
          "nickname": user.obj.nickname
        },
        token: 'Bearer ' + token,
      }
      ctx.set("set-cookie", `token=${token}; path=/; max-age=3600;`)
    } else {
      ctx.status = 201
      ctx.body = {
        message: '密码错误',
      }
    }
  } catch (error) {
    console.log(error)
    ctx.throw(error)
  }
}

module.exports = {
  'POST /login':login
}