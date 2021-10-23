import { AuthChannels } from '@fridgespy/types';
import { redisSubscriber } from '..';

export const setupAuthEventHandlers = () => {
  redisSubscriber.subscribe(AuthChannels.ON_AUTH, AuthChannels.ON_VALIDATE);

  redisSubscriber.on('message', (channel, message) => {
    console.log(`Received ${message} from ${channel}`);
  });
};
