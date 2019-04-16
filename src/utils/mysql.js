
const bluebird = require("bluebird");
const mysql = require('mysql2/promise');

let connection = null;

module.exports = {
    async dbInit (params) {
        connection = await mysql.createConnection({
            ...params,
            Promise: bluebird,
        });
        console.log(connection);
    },
};