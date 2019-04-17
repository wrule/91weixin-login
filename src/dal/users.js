
const UUID = require("uuid");
const mysqlPool = require("../utils/mysqlPool");

module.exports = {
    // 插入新用户
    async insertUser (user) {
        let result = await mysqlPool.exec("insert into users set ?", user);
        // console.log(result);
    },
    // 根据昵称查询用户
    async queryUserByNickName (nickname) {
        let result = await mysqlPool.exec(`
            select
                *
            from
                users
            where
                nickname = ?
            limit
                1
        `, nickname);
        if (result[0].length > 0) {
            return result[0][0];
        }
        else {
            return null;
        }
    },
    // 根据手机号码查询用户
    async queryUserByPhone (phone) {
        let result = await mysqlPool.exec(`
            select
                *
            from
                users
            where
                phone = ?
            limit
                1
        `, phone);
        if (result[0].length > 0) {
            return result[0][0];
        }
        else {
            return null;
        }
    },
}