import IORedis from 'ioredis';

const port: number = process.env.REDIS_PORT as unknown as number;

const subscriber = new IORedis({
  port,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

const publisher = new IORedis({
  port,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

const client = new IORedis({
  port,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

export const setupRedisSubscriber = () => {
  return subscriber;
};

export const setupRedisPublisher = () => {
  return publisher;
};

export const setupRedisClient = () => {
  return client;
};
