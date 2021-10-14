exports.up = async function (knex) {
  const betterTimestamps = (table) => {
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  };

  await knex.schema.createTable('user', (table) => {
    table.uuid('id').primary();
    table.string('email', 255).unique().notNullable();
    table.text('password').notNullable();
    table.string('name', 255).notNullable();
    table.text('avatar_url');
    table.string('display_name', 255);
    table.json('meta_data');
    betterTimestamps(table);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('user');
};
