// connect to redis
// sudo service redis-server start
const Redis = require("ioredis");
const redis = new Redis();

export default redis;
