import { ProductTypeChannels } from "@fridgespy/types";
import { appEvents } from "..";

export const setupProductTypeEventHandler = () => {
  appEvents.subscribe([
    ProductTypeChannels.PRODUCT_TYPE_CREATED,
    ProductTypeChannels.PRODUCT_TYPE_DELETED,
    ProductTypeChannels.PRODUCT_TYPE_UPDATED,
  ]);

  appEvents.onMessage((channel, message) => {
    switch (channel) {
      case ProductTypeChannels.PRODUCT_TYPE_CREATED:
        return console.log(
          `${ProductTypeChannels.PRODUCT_TYPE_CREATED} event fired with message: ${message}`
        );

      case ProductTypeChannels.PRODUCT_TYPE_UPDATED:
        return console.log(
          `${ProductTypeChannels.PRODUCT_TYPE_UPDATED} event fired with message: ${message}`
        );

      case ProductTypeChannels.PRODUCT_TYPE_DELETED:
        return console.log(
          `${ProductTypeChannels.PRODUCT_TYPE_DELETED} event fired with message: ${message}`
        );
    }
  });
};
