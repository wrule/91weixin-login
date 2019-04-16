
const mysql = require("./utils/mysql");

mysql.dbInit({
    host: "www.91weixin.net",
    user: "gu",
    password: "gushihao",
    database: "91weixin",
});

// const fs = require("fs");

// let users = [];

// function readUsers () {
//     let jsonStr = fs.readFileSync("./users.json").toString();
//     let users = JSON.parse(jsonStr);
//     return users;
// }
// function writeUsers (users) {
//     fs.writeFileSync("./users.json", JSON.stringify(users));
// }


// function userLogin (userName, password) {
    
// }



// users = readUsers();
// users.push({ name: "你好，世界" });
// writeUsers(users);