
const UUID = require("uuid");
const mysqlPool = require("../utils/mysqlPool");

module.exports = {
    // 插入新用户
    async insertUser (user) {
        let result = await mysqlPool.query("insert into users set ?", user);
        if (result[0]) {
            return result[0];
        }
        else {
            return null;
        }
    },
    // 根据昵称查询用户
    async queryUserByNickName (nickname) {
        let result = await mysqlPool.query(`
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
        let result = await mysqlPool.query(`
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
    // 根据邮箱查询用户
    async queryUserByEmail (email) {
        let result = await mysqlPool.query(`
            select
                *
            from
                users
            where
                email = ?
            limit
                1
        `, email);
        if (result[0].length > 0) {
            return result[0][0];
        }
        else {
            return null;
        }
    },
    // 根据账户查询用户
    async queryUserByAccount (account) {
        let result = await mysqlPool.query(`
            select
                *
            from
                users
            where
                account = ?
            limit
                1
        `, account);
        if (result[0].length > 0) {
            return result[0][0];
        }
        else {
            return null;
        }
    },
}