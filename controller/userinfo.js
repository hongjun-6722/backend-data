const UserinfoService = require("../services/UserinfoService");
/* 
*   管理员登录
*/
async function login (ctx, next) {

    let userinfo = ctx.request.body;
    let status, msg, data;
    
    try {
        data = await UserinfoService.login(userinfo.user, userinfo.pwd);
        data = data.obj;
        status = 200;
    }
    catch (err) {
        msg = err;
        status = 100;
        console.log("查询错误:"+err);
    };

    ctx.body = {
        data: data,
        status: status,
        msg: msg,
    }
}

/* 
*   管理员注册
*/
async function register (ctx, next) {

    let obj = ctx.request.body
    let data, status

    if(obj){
        try {
            data = await UserinfoService.register(obj);
            data = data.msg;
            status = 200;
        }
        catch (err) {
            data = err;
            status = 100;
            console.log("新增错误:"+err);
        };
    } else {
        data.msg = "数据传输错误";
    }

    ctx.body = {
        data: data,
        status: status,
    }
}

/* 
*   删除管理员
*/
async function deleteManager (ctx, next) {

    let obj = ctx.request.body
    let data, status

    if(obj){
        try {
            data = await UserinfoService.deleteManager(obj);
            data = data.msg;
            status = 200;
        }
        catch (err) {
            data = err;
            status = 100;
            console.log("账户删除错误:"+err);
        };
    } else {
        data.msg = "数据传输错误";
    }

    ctx.body = {
        data: data,
        status: status,
    }
}

/* 
*   管理员数据修改
*/
async function updateManager (ctx, next) {

    let obj = ctx.request.body;
    let data, status, msg = "";

    if(obj){
        if(obj.modifyingData){
            msg = "未获取更改数据"
        }
        if(obj.filtrate){
            msg = msg+"未获取筛选条件"
        }
        if(obj.modifyingData && obj.filtrate){
            try {
                data = await UserinfoService.updateManager(obj);
                status = 200;
            }
            catch (err) {
                data = err;
                status = 100;
                console.log("账户更改错误:"+err);
            };
        }
    } else {
        data.msg = "数据传输错误";
    }

    ctx.body = {
        data: data,
        status: status,
    }
}

/* 
*   查询管理员
*/
async function findAllManager (ctx, next) {

    let obj = ctx.request.body;
    let status, msg, data;
    
    try {
        data = await UserinfoService.findAllManager(obj);
        data = data;
        status = 200;
    }
    catch (err) {
        msg = err;
        status = 100;
        console.log("查询错误:"+err);
    };

    ctx.body = {
        data: data,
        status: status,
        msg: msg,
    }
}

module.exports = {
    login,register,deleteManager,updateManager,findAllManager
}