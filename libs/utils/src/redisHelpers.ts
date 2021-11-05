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

export class AppEvents<T> {
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
