
module.exports = {
    success (data, message) {
        return {
            status: 1,
            data: data,
            message: message,
        };
    },
    warning (data, message) {
        return {
            status: -1,
            data: data,
            message: message,
        };
    },
    error (message, data) {
        return {
            status: 0,
            data: data,
            message: message,
        };
    },
};