
const UUID = require("uuid/v4");
const rtv = require("../utils/rtv");
const usersDAL = require("../dal/users");
const captchaBLL = require("./captcha");
const mysqlPool = require("../utils/mysqlPool");

module.exports = {
    // 注册用户
    async registeredUser (user) {
        if (!user.nickname) {
            return rtv.error("昵称为空");
        }
        if (!user.password) {
            return rtv.error("密码为空");
        }
        if (user.gender !== 1 && user.gender !== 2) {
            return rtv.error("性别非法");
        }
        if (!user.captcha ||
            !user.captcha.uid ||
            !user.captcha.code) {
            return rtv.error("请正确输入验证码");
        }
        else {
            let result = await captchaBLL.CAPTCHAValidation(user.captcha.uid, user.captcha.code);
            if (!result) {
                return rtv.error("验证码输入错误");
            }
        }
        delete user.captcha;
        user.nickname = user.nickname.trim();
        user.password = user.password.trim();
        let rtValue = null;
        await mysqlPool.tran(async cnt => {
            let findResult = await usersDAL.queryUserByNickName(user.nickname);
            if (findResult) {
                rtValue = rtv.error("该昵称已被占用");
                return;
            }
            if (user.phone) {
                user.phone = user.phone.trim();
                findResult = await usersDAL.queryUserByPhone(user.phone);
                if (findResult) {
                    rtValue = rtv.error("该手机号码已被注册");
                    return;
                }
            }
            user.id = UUID();
            let result = await usersDAL.insertUser(user);
            if (result) {
                rtValue = rtv.success({
                    account: result.insertId.toString(),
                }, "注册成功");
            }
            else {
                rtValue = rtv.error("注册用户出错");
            }
        });
        return rtValue;
    },
};