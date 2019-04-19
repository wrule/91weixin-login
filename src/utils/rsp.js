
module.exports = {
    success (ctx, data, status = 1, message = "查询成功") {
        let result = {
            status: status,
            data: data,
            message: message,
        };
        ctx.status = 200;
        ctx.body = result;
    },
    error (ctx, message = "服务器内部错误", data) {
        let result = {
            data: data,
            message: message,
        };
        ctx.status = 500;
        ctx.body = result;
    },
    hold404 (ctx, next) {
        ctx.status = 404;
        ctx.body = {
            message: "资源不存在",
        };
    },
};