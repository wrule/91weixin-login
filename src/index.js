

const Koa = require("koa");
const KoaRouter = require("koa-router");
const colors = require("colors");
const mysqlPool = require("./utils/mysqlPool");
const usersBLL = require("./bll/users");
const bodyParser = require('koa-bodyparser');

// 服务端端口
const serverPort = 10241;

// 404中间件
function hold404 (ctx, next) {
    let code = 404;
    ctx.status = code;
    ctx.body = {
        code: code,
        data: null,
        msg: "资源不存在",
    };
}
// 200中间件
function successResponse (ctx, data, message = "查询成功") {
    let result = {
        code: 200,
        data: data,
        message: message,
    };
    ctx.status = result.code;
    ctx.body = result;
}
// 500中间件
function failureResponse (ctx, message = "服务器内部错误") {
    let result = {
        code: 500,
        message: message,
    };
    ctx.status = result.code;
    ctx.body = result;
}

async function main () {
    try {
        let app = new Koa();
        let router = new KoaRouter();
        await mysqlPool.open();

        router.get("/api", async (ctx, next) => {
            try {
                successResponse(ctx, "123");
            }
            catch (e) {
                failureResponse(ctx, e.message);
            }
        });

        router.post("/users/register", async (ctx, next) => {
            try {
                let user = ctx.request.body;
                let result = await usersBLL.registeredUser(user);
                if (result.status == 0) {
                    successResponse(ctx, result.data);
                }
                else {
                    failureResponse(ctx, result.message);
                }
            }
            catch (e) {
                failureResponse(ctx, e.message);
            } 
        });

        app
            .use(bodyParser())
            .use(router.routes())
            .use(hold404);
        app.listen(serverPort);
        console.log(`OK！现在后端服务已经启动，工作在 ${ serverPort } 端口，如需一直开启服务请不要关闭此进程...`.green);
    }
    catch (e) {
        console.error(e.message);
    }
    // await mysqlPool.open();
    // let result = await usersBLL.registeredUser({
    //     nickname: "猪毛巾",
    //     password: "gushihao",
    //     gender: 1,
    //     email: "gushihao@hotmail.com",
    //     phone: "13835819881",
    // });
    // console.log(result);
    // await mysqlPool.close();
}

main();