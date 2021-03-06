
const UUID = require("uuid/v4");
const svgCaptcha = require('svg-captcha');
const redisClient = require("../utils/redisClient");
const appConfig = require("../../app.json");

let client = redisClient.create(1);

module.exports = {
    // 生成图形验证码
    createCAPTCHA () {
        return svgCaptcha.create({
            color: true,
            noise: 3,
            background: "white",
        });
    },
    // 生成一个图形验证码
    async newCAPTCHAService () {
        // 分发给用户的服务Id
        let uid = UUID();
        let captcha = this.createCAPTCHA();
        // 验证码
        let code = captcha.text;
        // svg图片数据
        let svgImage = captcha.data;
        // 缓存到Redis
        await client.setexAsync(uid, appConfig.CAPTCHATimelen, code);
        return {
            uid: uid,
            svgImage: svgImage,
        };
    },
    // 根据UID更新图形验证码
    async updateCAPTCHA (uid) {
        let exist = await client.existsAsync(uid);
        if (exist) {
            let captcha = this.createCAPTCHA();
            // 验证码
            let code = captcha.text;
            // svg图片数据
            let svgImage = captcha.data;
            // 缓存到Redis
            await client.setexAsync(uid, appConfig.CAPTCHATimelen, code);
            return {
                uid: uid,
                svgImage: svgImage,
            };
        }
        else {
            return null;
        }
    },
    // 验证图形验证码
    async CAPTCHAValidation (uid, code) {
        let exists = await client.existsAsync(uid);
        if (exists) {
            let rdsCode = await client.getAsync(uid);
            await client.del(uid);
            if (rdsCode) {
                if (rdsCode.toLowerCase() == code.toLowerCase()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
};