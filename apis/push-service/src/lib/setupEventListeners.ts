import { ILocationProduct } from "@fridgespy/types";
import { appEvents } from "..";
import { publishLocationProductUpdated } from "./locationEvents";

export const setupEventListeners = () => {
  appEvents.onMessage((channel, message) => {
    switch (channel) {
      case "LOCATION_PRODUCT_ADDED":
        // Figure out who is in charge of getting the user ids needed?
        return publishLocationProductUpdated(message as ILocationProduct);
    }

    console.log(`Got message: ${message} on channel ${channel}`);
  });
};
