/* eslint-disable no-undef */
exports.up = async function (knex) {
  const betterTimestamps = (table) => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  };

  // A user can have one role in a location
  await knex.schema.createTable("location_user_role", (table) => {
    table.text("role").primary();
  });

  await knex("location_user_role").insert(roles);

  // Locations can be things like a fridge, pantry, freezer or other items/places that contains goods
  await knex.schema.createTable("location", (table) => {
    table.uuid("id").primary();
    table.string("name", 255).notNullable();
    table.string("description", 255).notNullable();
    betterTimestamps(table);
  });

  // A table to connect a user and a location. A location can have many users, and users can be part of many houses
  await knex.schema.createTable("user_location", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id");
    table.uuid("location_id").references("location.id").notNullable();
    table.text("user_role").references("location_user_role.role").notNullable();
    betterTimestamps(table);
  });

  // A LocationProduct is the representation of what is known to be stored in a location
  await knex.schema.createTable("location_product", (table) => {
    table.uuid("id").primary();
    table.uuid("location_id").references("location.id").index().notNullable();
    // A product entry can be either a specific product, or a product type
    table.uuid("product_id").nullable();
    table.uuid("product_type_id").nullable();
    betterTimestamps(table);
    table.integer("minimum_amount").defaultsTo(0);
    table.integer("maximum_amount").defaultsTo(1);
    // Facilitates soft delete of product
    table.timestamp("deleted_at");
  });

  // An entry of a product on a location, one line per entry
  await knex.schema.createTable("location_product_entry", (table) => {
    table.uuid("id").primary();
    table.uuid("location_product_id").references("location_product.id");
    betterTimestamps(table);
    table.timestamp("taken_at");
    table.string("input_action").defaultTo("MANUAL");
    table.string("take_action");
  });

  return;
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("location_product_entry");
  await knex.schema.dropTableIfExists("location_product");
  await knex.schema.dropTableIfExists("user_location");
  await knex.schema.dropTableIfExists("location");
  await knex.schema.dropTableIfExists("location_user_role");
  return;
};

const roles = [{ role: "ADMIN" }, { role: "USER" }];
