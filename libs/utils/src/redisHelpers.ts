export const cache = (redisInstance) => {
  const set = async <T>(
    key: string,
    data: T,
    ttl: number = 60
  ): Promise<void> => {
    return redisInstance.set(key, JSON.stringify(data), "EX", ttl);
  };

  const get = async <T>(key: string): Promise<T> => {
    return redisInstance.get(key).then((data) => JSON.parse(data));
  };

  const del = async (key: string): Promise<void> => {
    redisInstance.del(key);
    return;
  };

  return { get, set, del };
};

export class AppCache<T> {
  instance;
  constructor(instance: T) {
    this.instance = instance;
  }

  set<G>(key: string, data: G, ttl: number = 60): Promise<void> {
    return this.instance.set(key, JSON.stringify(data), "EX", ttl);
  }

  get<G>(key: string): Promise<G> {
    return this.instance.get(key).then((data) => JSON.parse(data));
  }

  del(key: string) {
    this.instance.del(key);
    return;
  }
}

export const appEvents = (redisInstance) => {
  const publish = async <T>(channel: string, data: T): Promise<void> => {
    return redisInstance.publish(channel, JSON.stringify(data));
  };

  return { publish };
};
