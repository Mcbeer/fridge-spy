import IORedis from "ioredis";

export const setupRedisSubscriber = () => {
  return new IORedis({
    port: 6379,
    host: "127.0.0.1",
    password: "bacon123",
  });
};

export const setupRedisPublisher = () => {
  return new IORedis({
    port: 6379,
    host: "127.0.0.1",
    password: "bacon123",
  });
};

export const setupRedisClient = () => {
  return new IORedis({
    port: 6379,
    host: "127.0.0.1",
    password: "bacon123",
  });
};
