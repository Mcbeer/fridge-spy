import IORedis from "ioredis";

export class AppCache<T extends IORedis.Redis> {
  instance;
  constructor(instance: T) {
    this.instance = instance;
  }

  set<G>(key: string, data: G, ttl: number = 60): Promise<"OK" | null> {
    return this.instance.set(key, JSON.stringify(data), "EX", ttl);
  }

  get<G>(key: string): Promise<G | null> {
    return this.instance.get(key).then((data) => {data ? JSON.parse(data) : null}) as Promise<G | null>;
  }

  del(key: string) {
    this.instance.del(key);
    return;
  }
}

interface AppEventsBaseMethods {
  publish(channel: string, message: any): Promise<any>;
  subscribe(channel: string[]): Promise<any>;
  on(channel: string, callback: (channel: string, message: string) => void): Promise<any>;
}

export class AppEvents<T extends IORedis.Redis> {
  private publisher;
  private subscriber;
  constructor(publisher: T, subscriber: T) {
    this.publisher = publisher;
    this.subscriber = subscriber;
  }

  publish<G>(channel: string, data: G) {
    return this.publisher.publish(channel, JSON.stringify(data));
  }

  subscribe(channels: string[]) {
    return this.subscriber.subscribe(...channels);
  }

  onMessage(callback: (channel: string, message: string) => void) {
    return this.subscriber.on("message", callback);
  }
}
