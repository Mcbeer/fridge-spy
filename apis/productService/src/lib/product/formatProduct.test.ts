import { IDBProduct } from "@fridgespy/types";
import { getTimeNow } from "../../utils/getTimeNow";
import { formatDBProductToProduct } from "./formatProduct";

// TODO Make more test cases, only the happy path is not enough

describe("formatDBProductToProduct", () => {
  describe("When a valid object is sent to the formatter", () => {
    it("should return a correctly formatted object", () => {
      const now = getTimeNow();
      const dbProduct: IDBProduct = {
        id: "20c36acb-6094-435b-90c0-3f5a76dc17bd",
        name: "Test Product",
        barcode: "1234567891234",
        image_url: "This is my url",
        added_by: "5cbcea65-646c-4d69-a1e1-0a1e264b67df",
        brand_id: "c2f31722-6693-49f1-9075-f4ee2bd39f57",
        product_type_id: "8e0463c1-0474-4a12-bf91-f57ef1889597",
        created_at: now,
        updated_at: now,
      };
      const result = formatDBProductToProduct(dbProduct);

      expect(result).not.toBe(null);
      expect(result.imageUrl).toEqual(dbProduct.image_url);
      expect(result.name).toEqual(dbProduct.name);
      expect(result.brand).toEqual(dbProduct.brand_id);
    });
  });
});

export {};
