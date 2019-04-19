
const UUID = require("uuid/v4");
const svgCaptcha = require('svg-captcha');

module.exports = {
    // 生成一个图形验证码服务
    newCAPTCHAService () {
        // 分发给用户的服务Id
        let uid = UUID();
        let captcha = svgCaptcha.create();
        // 验证码
        let code = captcha.text;
        // svg图片数据
        let svgImage = captcha.data;
        return {
            uid: uid,
            svgImage: svgImage,
        };
    },
};