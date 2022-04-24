import common from 'mocha/lib/interfaces/common';
import config from '../config/jwt_config';
import User from '../dao/UserinfoDAO'
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.secret;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        //jwt_payload 返回的是登录时返回的数据 即payload
        const user = await User.findOne({ username: jwt_payload.username })
        console.log("tokenpass")
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }))
}
