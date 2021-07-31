/* eslint-disable no-undef */
exports.up = async function (knex) {
  const betterTimestamps = (table) => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  };

  await knex.schema.createTable("house_user_role", (table) => {
    table.text("role").primary();
  });

  await knex("house_user_role").insert(roles);

  await knex.schema.createTable("house", (table) => {
    table.uuid("id").primary();
    table.string("name", 255).notNullable();
    betterTimestamps(table);
  });

  await knex.schema.createTable("location", (table) => {
    table.uuid("id").primary();
    table.string("name", 255).notNullable();
    table.string("description", 255).notNullable();
    table.uuid("house_id").references("house.id");
    betterTimestamps(table);
  });

  await knex.schema.createTable("user_house", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id").references("user.id");
    table.uuid("house_id").references("house.id");
    table.text("user_role").references("user_house_role.role").notNullable();
    betterTimestamps(table);
  });

  await knex.schema.createTable("location_product", (table) => {
    table.uuid("id").primary();

    // A product entry can be either a specific product, or a product type
    table.uuid("product_id").references("product.id").nullable();
    table.uuid("product_type_id").references("product_type.id").nullable();

    betterTimestamps(table);
    table.integer("minimum_amount").defaultsTo(0);
    table.integer("maximum_amount");
    // Facilitates soft delete of product
    table.timestamp("deleted_at");
  });

  await knex.schema.createTable("location_product_entry", (table) => {
    table.uuid("id").primary();

    // Reference either the specific product or the product type
    table.uuid("product_id").references("product.id").nullable();
    table.uuid("product_type_id").references("product_type.id").nullable();

    table.uuid("location_product_id").references("location_product.id");
    betterTimestamps(table);
    table.timestamp("taken_at");
    table.string("input_action").defaultTo("manual");
    table.string("take_action");
  });

  return;
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("location_product_entry");
  await knex.schema.dropTableIfExists("location_product");
  await knex.schema.dropTableIfExists("user_house");
  await knex.schema.dropTableIfExists("location");
  await knex.schema.dropTableIfExists("house");
  await knex.schema.dropTableIfExists("house_user_role");
  return;
};

const roles = [{ role: "ADMIN" }, { role: "USER" }];
