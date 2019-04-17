
const bluebird = require("bluebird");
const mysql = require('mysql2/promise');
const appConfig = require("../../app.json");

let pool = null;
let connection = null;

module.exports = {
    // 打开MySQL链接池
    async open () {
        pool = await mysql.createPool({
            ...appConfig.dbConnection,
            Promise: bluebird,
            connectionLimit: 10,
        });
    },
    // 关闭MySQL链接池
    async close () {
        await pool.end();
    },
    // 执行SQL语句
    async exec (sql, params) {
        connection = await pool.getConnection();
        let result = await connection.execute(sql, params);
        connection.release();
        return result;
    },
    async query (sql, params) {
        connection = await pool.getConnection();
        let result = await connection.query(sql, params);
        connection.release();
        return result;
    },
    // 执行事务
    async tran (func) {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        await func(connection);
        await connection.commit();
        connection.release();
    },
};