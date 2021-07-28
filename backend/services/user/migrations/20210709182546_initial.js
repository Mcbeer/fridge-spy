/* eslint-disable no-undef */
exports.up = async function (knex) {
  const betterTimestamps = (table) => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  };

  await knex.schema.createTable("user", (table) => {
    table.uuid("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.text("password").notNullable();
    table.text("avatar_url");
    betterTimestamps(table);
  });

  return;
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user");
  return;
};
