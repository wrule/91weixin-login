const usersDAL = require("../dal/users");

module.exports = {
    // 登录验证
    async loginValidation (account, password) {
        if (account) {
            account = account.trim();
        }
        else {
            return {

            };
        }
        if (password) {
            password = password.trim();
        }
        else {
            return {

            };
        }
        let userResult = usersDAL.queryUserByNickName(account);
        if (!userResult) {
            userResult = usersDAL.queryUserByPhone(account);
            if (!userResult) {
                userResult = usersDAL.queryUserByEmail(account);
                if (!userResult) {
                    userResult = usersDAL.queryUserByAccount(account);
                    if (!userResult)
                }
            }
        }
    },
};