
const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const appConfig = require("../../app.json");

let client = redis.createClient(appConfig.redisConnection);

module.exports = {
    me () {
        return client;
    },
};