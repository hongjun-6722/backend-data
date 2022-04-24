var url = require('url')

/**
 * 
 * @param {Object} ctx 
 * @returns URL参数对象
 */
 function urlParser(ctx){
    let url = ctx.request.url
    let origin = ctx.request.origin
    let obj = new URL(url,origin).searchParams;
    let urlobj = {}
    for (const name of obj.keys()) {
        urlobj[name] = obj.get(name)
    }
    return urlobj;
}

module.exports = {
    urlParser
}