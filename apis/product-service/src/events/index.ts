import { setupBrandEventHandler } from "./brand.events";
import { setupProductEventHandler } from "./product.events";
import { setupProductTypeEventHandler } from "./productType.events";

export const setupEventHandlers = () => {
  setupBrandEventHandler();
  setupProductEventHandler();
  setupProductTypeEventHandler();
};
