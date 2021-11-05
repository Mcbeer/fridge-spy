import { ProductChannels } from "@fridgespy/types";
import { appEvents } from "..";

export const setupProductEventHandler = () => {
  appEvents.subscribe([
    ProductChannels.PRODUCT_CREATED,
    ProductChannels.PRODUCT_DELETED,
    ProductChannels.PRODUCT_UPDATED,
  ]);

  appEvents.onMessage((channel, message) => {
    switch (channel) {
      case ProductChannels.PRODUCT_CREATED:
        return console.log(
          `${ProductChannels.PRODUCT_CREATED} event fired with message: ${message}`
        );

      case ProductChannels.PRODUCT_UPDATED:
        return console.log(
          `${ProductChannels.PRODUCT_UPDATED} event fired with message: ${message}`
        );

      case ProductChannels.PRODUCT_DELETED:
        return console.log(
          `${ProductChannels.PRODUCT_DELETED} event fired with message: ${message}`
        );
    }
  });
};
