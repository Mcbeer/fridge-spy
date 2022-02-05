import IORedis from "ioredis";

const port: number = process.env.REDIS_PORT as unknown as number;

export const setupRedisSubscriber = () => {
  return new IORedis({
    port,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });
};

export const setupRedisPublisher = () => {
  return new IORedis({
    port,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });
};

export const setupRedisClient = () => {
  return new IORedis({
    port,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });
};
