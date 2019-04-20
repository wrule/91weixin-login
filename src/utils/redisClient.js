
const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const appConfig = require("../../app.json");

module.exports = {
    // 新建Redis连接
    create (dbIndex = 0) {
        return redis.createClient({
            ...appConfig.redisConnection,
            db: dbIndex,
        });
    },
};