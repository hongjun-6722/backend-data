const URLapi = require('../util/urlUtil')
const Services = require('../services/QuerysqlService')

async function searchindex(ctx) {

    var body = URLapi.urlParser(ctx)
    console.log(body)

    try {

        //判断请求体参数
        if (!body) {

            ctx.status = 200;
            ctx.body = {
                "list": []
            };
            return;

        } else {

            var queryString = body.queryString

            var data = await Services.query(queryString)

            console.log(data)

            ctx.status = 200
            ctx.body = {
                "list": [
                    ["三全鲜食（北新泾店）", "长宁区新渔路144号"],
                    ["Hot honey 首尔炸鸡（仙霞路）", "上海市长宁区淞虹路661号"],
                ]
            }
        }

    }
    catch (error) {
        ctx.throw(error)
    }

}

async function searchcategory(ctx) {


    try {
        var data = await Services.category()
        console.log(data)

        ctx.status = 200
        ctx.body = data
    }
    catch (error) {
        ctx.throw(error)
    }

}

module.exports = {
    'GET /search/index': searchindex,
    'GET /search/category': searchcategory
}