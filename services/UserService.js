// import sequelize from '@main/db';
// import { isNull, isBlank } from '@main/util/ValidateUtil';
// import { ParamError, LoginError } from '@main/common/CommonError';
// import { encryptPasswrod, checkPasswrod } from '@main/util/PasswordUtil';
// import config from '@main/config';
// import blacklist from 'blacklist';
// import jwt from 'jsonwebtoken';

// const userModel = sequelize.model('user');

// class UserService {
//   static async login({username, password}) {
//     if (isBlank(username)) {
//       throw new ParamError('用户名不能为空');
//     }
//     if (isBlank(password)) {
//       throw new ParamError('密码不能为空');
//     }
//     let user = await userModel.findOne({
//       where: {
//         phone: username
//       }
//     });
//     if (!user) {
//       throw new LoginError('账号或者密码错误');
//     }
//     user = user.dataValues;
//     let check = await checkPasswrod(password, user.password);
//     if (!check) {
//       throw new LoginError('账号或者密码错误');
//     }
//     // 排除掉 password 字段
//     let payload = blacklist(user, 'password');
//     let token = jwt.sign(payload, config.jwt.secret, {
//       expiresIn: config.jwt.expiresIn
//     });
//     return token;
//   }
// };

// export default UserService;
