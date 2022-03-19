import koajwt from 'koa-jwt';
import config from '../config/jwt_config';

export default () => {
  return koajwt({ secret: config.jwt.secret })
};
