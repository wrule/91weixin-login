
const rtv = require("../utils/rtv");
const usersDAL = require("../dal/users");
const UUID = require("uuid/v4");

module.exports = {
    // 注册用户
    async registeredUser (user) {
        if (!user.nickname) {
            return rtv.error("昵称为空");
        }
        if (!user.password) {
            return rtv.error("密码为空");
        }
        if (user.gender !== 0 && user.gender !== 1) {
            return rtv.error("性别非法");
        }
        user.nickname = user.nickname.trim();
        user.password = user.password.trim();
        let findResult = await usersDAL.queryUserByNickName(user.nickname);
        if (findResult) {
            return rtv.error("该昵称已被占用");
        }
        if (user.phone) {
            user.phone = user.phone.trim();
            findResult = await usersDAL.queryUserByPhone(user.phone);
            if (findResult) {
                return rtv.error("该手机号码已被注册");
            }
        }
        user.id = UUID();
        let result = await usersDAL.insertUser(user);
        if (result) {
            return rtv.success({
                account: result.insertId.toString(),
            }, "注册成功");
        }
        else {
            return rtv.error("注册用户出错");
        }
    },
};