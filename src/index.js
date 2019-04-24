

const Koa = require("koa");
const KoaRouter = require("koa-router");
const bodyParser = require('koa-bodyparser');
const colors = require("colors");

const mysqlPool = require("./utils/mysqlPool");
const rsp = require("./utils/rsp");
const usersBLL = require("./bll/users");
const loginBLL = require("./bll/login");
const captchaBLL = require("./bll/captcha");

// 服务端端口
const serverPort = 10241;

async function main () {
    try {
        let app = new Koa();
        let router = new KoaRouter();
        await mysqlPool.open();
        // 注册用户
        router.post("/api/91wx/users/register", async (ctx, next) => {
            try {
                let user = ctx.request.body;
                let result = await usersBLL.registeredUser(user);
                rsp.success(ctx, result.data, result.status, result.message);
            }
            catch (e) {
                rsp.error(ctx, e.message);
            }
        });
        // 登录验证
        router.post("/api/91wx/login", async (ctx, next) => {
            try {
                let params = ctx.request.body;
                let result = await loginBLL.loginValidation(params.account, params.password);
                rsp.success(ctx, result.data, result.status, result.message);
            }
            catch (e) {
                rsp.error(ctx, e.message);
            }
        });
        // 开启一个新的图形验证码服务
        router.post("/api/91wx/captcha/new", async (ctx, next) => {
            try {
                let result = await captchaBLL.newCAPTCHAService();
                rsp.success(ctx, result);
            }
            catch (e) {
                rsp.error(ctx, e.message);
            }
        });
        // 更新图形验证码
        router.post("/api/91wx/captcha/update", async (ctx, next) => {
            try {
                let params = ctx.request.body;
                let result = await captchaBLL.updateCAPTCHA(params.uid);
                rsp.success(ctx, result);
            }
            catch (e) {
                rsp.error(ctx, e.message);
            }
        });

        app
            .use(bodyParser())
            .use(router.routes())
            .use(rsp.hold404);
        app.listen(serverPort);
        console.log(`OK！现在后端服务已经启动，工作在 ${ serverPort } 端口，如需一直开启服务请不要关闭此进程...`.green);
    }
    catch (e) {
        console.error(e.message);
    }
    // await mysqlPool.close();
}

main();