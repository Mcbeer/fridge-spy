import IORedis from 'ioredis';

const subscriber = new IORedis({
  port: 6379,
  host: '127.0.0.1',
  password: 'bacon123',
});

const publisher = new IORedis({
  port: 6379,
  host: '127.0.0.1',
  password: 'bacon123',
});

const client = new IORedis({
  port: 6379,
  host: '127.0.0.1',
  password: 'bacon123',
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
