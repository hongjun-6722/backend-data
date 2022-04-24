import { verToken } from '../util/token';

async function vartoken(ctx) {
    const { body } = ctx.request
    try {
        if(body.token){
            var data = await verToken(body.token);
            ctx.status = 200;
            ctx.body = data;
        } else {
            ctx.status = 401;
            ctx.body = {
                message: "未检出token"
            }; 
        }
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    'POST /vartoken': vartoken
}