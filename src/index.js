
const fs = require("fs");

let users = [];

function readUsers () {
    let jsonStr = fs.readFileSync("./users.json").toString();
    let users = JSON.parse(jsonStr);
    return users;
}
function writeUsers (users) {
    fs.writeFileSync("./users.json", JSON.stringify(users));
}


function userLogin (userName, password) {
    
}



users = readUsers();
users.push({ name: "你好，世界" });
writeUsers(users);