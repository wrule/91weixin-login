// 复杂返回值生成
module.exports = {
    // 成功
    success (data, message) {
        return {
            status: 1,
            data: data,
            message: message,
        };
    },
    // 成功但是警告
    warning (data, message) {
        return {
            status: -1,
            data: data,
            message: message,
        };
    },
    // 错误
    error (message, data) {
        return {
            status: 0,
            data: data,
            message: message,
        };
    },
};