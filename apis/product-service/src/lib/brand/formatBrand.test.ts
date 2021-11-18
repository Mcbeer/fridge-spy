import { formatDBBrandToBrand } from './formatBrand';

describe("formatDBBrandToBrand", () => {
    describe("When a valid object is passed to the function", () => {
        it("should return a properly formatted object", () => {
            const inputBrand = {
                id: "test",
                name: "Test Brand",
                created_at: "2020-01-01",
                updated_at: "2020-01-01",
            }

            const result = formatDBBrandToBrand(inputBrand);

            expect(result).toHaveProperty("id", "test");
            expect(result).toHaveProperty("name", "Test Brand");
            expect(result).toHaveProperty("createdAt", "2020-01-01");
            expect(result).toHaveProperty("updatedAt", "2020-01-01");
        })
    });

    describe("When created_at and updated_at are invalid values", () => {
        it("should return an empty string for the fields", () => {
            const inputBrand = {
                id: "test",
                name: "Test Brand",
                created_at: "",
                updated_at: "",
            }

            const result = formatDBBrandToBrand(inputBrand);

            expect(result).toHaveProperty("id", "test");
            expect(result).toHaveProperty("name", "Test Brand");
            expect(result).toHaveProperty("createdAt", "");
            expect(result).toHaveProperty("updatedAt", "");
        })
    })
})