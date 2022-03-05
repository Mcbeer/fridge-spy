import { UserRoles } from "@fridgespy/types";
import { describe, expect, it } from "vitest";
import { formatLocation } from "./formatLocation";

describe("formatLocation", () => {
  describe("Happy path", () => {
    it("should return a formatted location", () => {
      const location = {
        id: "123",
        name: "Test Location",
        description: "This is a test location",
        user_role: UserRoles.USER,
        created_at: "2020-01-01",
        updated_at: "2020-01-01",
      };
      const formattedLocation = formatLocation(location);
      expect(formattedLocation).toEqual({
        id: "123",
        name: "Test Location",
        description: "This is a test location",
        userRole: UserRoles.USER,
        createdAt: "2020-01-01",
        updatedAt: "2020-01-01",
      });
    });
  });
  describe("Without created or updated dates", () => {
    it("should return a formatted location, with empty created and updated at", () => {
      const location = {
        id: "123",
        name: "Test Location",
        description: "This is a test location",
        user_role: UserRoles.USER,
      };
      const formattedLocation = formatLocation(location);
      expect(formattedLocation).toEqual({
        id: "123",
        name: "Test Location",
        description: "This is a test location",
        userRole: UserRoles.USER,
        createdAt: "",
        updatedAt: "",
      });
    });
  });
});
