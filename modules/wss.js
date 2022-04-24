const WebSocket = require('ws');
const Token = require('../util/token')
// 引用Server类:
const WebSocketServer = WebSocket.Server;

var messageIndex = 0;

function parseUser(obj) {

    if (!obj) {
        return obj;
    }
    if (typeof obj === 'object' && Buffer.isBuffer(obj)) {
        if (obj) {
            try {
                let message = JSON.parse(Buffer.from(obj, 'base64').toString());
                return message;
            } catch (e) {
            }
        }
    }
}

function createMessage(type, user, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        nickname: user,
        data: data
    });
}

// 实例化:
function serverinit() {

    const wss = new WebSocketServer({ server: global.server });
    console.log("init wss")

    var usertable = []//用户列表

    wss.on('connection', function (ws, req) {
        console.log(`[SERVER] connection()`);
        if (!req.headers.cookie) {
            ws.send(JSON.stringify({ "errmsg": '未登录 连接已关闭' }))
            ws.close(1000, "未登录")
        } else {
            let token = req.headers.cookie.toString().substring(6)
            let tokendata = Token.verToken(token)
            ws['nickname'] = tokendata.user.nickname
            ws.send(JSON.stringify({ "type": "usertable", "usertable": usertable }))
        }

        ws.on('message', function (message) {
            message = parseUser(message)
            console.log(message);
            let nickname = message.user;
            if (message.type == 'join') {

                usertable.push({ "nickname": nickname });
                let msg = createMessage(message.type, nickname, message.data);
                wss.broadcast(msg);

            } else if (message.type == 'exit') {

                let msg = createMessage(message.type, nickname, message.data);
                wss.broadcast(msg);

            } else if (message.type == 'usermsg') {

                let msg = createMessage(message.type, nickname, message.data);
                wss.broadcast(msg);

            }
        })

        ws.on("close", function () {
            usertable = usertable.filter((item) => {
                return item.nickname != ws.nickname;
            });
            console.log("断开")
        })

    });



    wss.broadcast = function (data) {
        wss.clients.forEach(function (client) {
            client.send(`${data}`);
        });
    };
}

module.exports = {
    serverinit
}

