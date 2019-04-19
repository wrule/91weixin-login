
const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const appConfig = require("../../app.json");

module.exports = {
    create (dbIndex = 0) {
        return redis.createClient({
            ...appConfig.redisConnection,
            db: dbIndex,
        });
    },
};