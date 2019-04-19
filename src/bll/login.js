const rtv = require("../utils/rtv");
const usersDAL = require("../dal/users");
const JWT = require("jsonwebtoken");
const appConfig = require("../../app.json");
const redisClient = require("../utils/redisClient");

let client = redisClient.create(0);

module.exports = {
    // 登录验证
    async loginValidation (account, password) {
        if (account) {
            account = account.trim();
        }
        else {
            return rtv.error("登录账户为空");
        }
        if (password) {
            password = password.trim();
        }
        else {
            return rtv.error("登录密码为空");
        }
        // 多途径验证登录
        let userResult = await usersDAL.queryUserByNickName(account);
        if (!userResult) {
            userResult = await usersDAL.queryUserByPhone(account);
            if (!userResult) {
                userResult = await usersDAL.queryUserByEmail(account);
                if (!userResult) {
                    userResult = await usersDAL.queryUserByAccount(account);
                    if (!userResult) {
                        return rtv.error("用户名或密码错误");
                    }
                }
            }
        }
        if (userResult.password != password) {
            return rtv.error("用户名或密码错误");
        }
        let tokenInfo = {
            account: userResult.account,
            role: userResult.role,
        };
        let token = JWT.sign(tokenInfo, appConfig.privateKey);
        await client.setex(token, 20 * 60, 1);
        return rtv.success({ token: token }, "登录成功");
    }
};