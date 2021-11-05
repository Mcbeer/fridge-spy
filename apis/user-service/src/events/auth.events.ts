import { AuthChannels } from '@fridgespy/types';
import { appEvents } from '..';

export const setupAuthEventHandlers = () => {
  appEvents.subscribe([AuthChannels.ON_AUTH, AuthChannels.ON_VALIDATE]);

  appEvents.onMessage((channel, message) => {
    console.log(`Received ${message} from ${channel}`);
  });
};
