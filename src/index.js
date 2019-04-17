
const mysqlPool = require("./utils/mysqlPool");

const usersDal = require("./dal/users");
const UUID = require("uuid/v4");


async function main () {
    await mysqlPool.open();
    // console.log(UUID());
    // await usersDal.insertUser({
    //     id: UUID(),
    //     password: "gushihao",
    //     nickname: "鸡毛巾",
    //     gender: 1,
    //     email: "gushihao@hotmail.com",
    //     phone: "13645810952",
    // });

    let obj = await usersDal.queryUserByPhone("13645810952");
    console.log(obj);

    // await mysqlPool.tran(async cnt => {
    //     await cnt.query("insert into users set ?", {
    //         id: UUID(),
    //         password: "gushihao",
    //         nickname: "鸡毛巾",
    //         gender: 1,
    //         email: "gushihao@hotmail.com",
    //         phone: "13645810952",
    //     });
    // });

    await mysqlPool.close();
}

main();