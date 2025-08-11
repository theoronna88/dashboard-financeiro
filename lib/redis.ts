import Redis from "ioredis";

/*
const redis = new Redis({
  host: process.env.REDIS_AIVEN_HOST,
  port: Number(process.env.REDIS_AIVEN_PORT),
  password: process.env.REDIS_AIVEN_PASSWORD,
  username: process.env.REDIS_AIVEN_USER,
});
*/

const redisAiven = process.env.REDIS_AIVEN;
if (!redisAiven) {
  throw new Error("REDIS_AIVEN environment variable is not defined");
}
const redis = new Redis(redisAiven);

export default redis;
