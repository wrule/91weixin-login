
const usersDAL = require("../dal/users");
const UUID = require("uuid/v4");

module.exports = {
    // 注册用户业务逻辑
    async registeredUser (user) {
        if (!user.nickname) {
            return {
                status: 1,
                message: "昵称为空",
            };
        }
        if (!user.password) {
            return {
                status: 1,
                message: "密码为空",
            };
        }
        if (user.gender !== 0 && user.gender !== 1) {
            return {
                status: 1,
                message: "性别非法",
            };
        }
        user.nickname = user.nickname.trim();
        user.password = user.password.trim();
        let findResult = await usersDAL.queryUserByNickName(user.nickname);
        if (findResult) {
            return {
                status: 1,
                message: "该昵称已经被占用",
            };
        }
        if (user.phone) {
            user.phone = user.phone.trim();
            findResult = await usersDAL.queryUserByPhone(user.phone);
            if (findResult) {
                return {
                    status: 1,
                    message: "该手机号码已经被注册",
                };
            }
        }
        user.id = UUID();
        let result = await usersDAL.insertUser(user);
        if (result[0]) {
            return {
                status: 0,
                data: {
                    account: result[0].insertId.toString(),
                },
            };
        }
        else {
            return {
                status: 1,
                message: "新增数据出错",
            };
        }
    },
};