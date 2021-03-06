import { BrandChannels } from "@fridgespy/types";
import { appEvents } from "..";

export const setupBrandEventHandler = () => {
  appEvents.subscribe([
    BrandChannels.BRAND_CREATED,
    BrandChannels.BRAND_DELETED,
    BrandChannels.BRAND_UPDATED,
  ]);

  appEvents.onMessage((channel, message) => {
    switch (channel) {
      case BrandChannels.BRAND_CREATED:
        return console.log(
          `${BrandChannels.BRAND_CREATED} event fired with message: ${message}`
        );

      case BrandChannels.BRAND_UPDATED:
        return console.log(
          `${BrandChannels.BRAND_UPDATED} event fired with message: ${message}`
        );

      case BrandChannels.BRAND_DELETED:
        return console.log(
          `${BrandChannels.BRAND_DELETED} event fired with message: ${message}`
        );
    }
  });
};
