/* eslint-disable no-undef */
exports.up = async function (knex) {
  const betterTimestamps = (table) => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  };

  await knex.schema.createTable("brand", (table) => {
    table.uuid("id").primary();
    table.string("name", 255).notNullable();
    betterTimestamps(table);
  });

  await knex("brand").insert(basicGenericBrands);

  await knex.schema.createTable("product_type", (table) => {
    table.uuid("id").primary();
    table.string("name", 255).notNullable();
    table.string("description", 255).notNullable();
    betterTimestamps(table);
  });

  await knex("product_type").insert(basicGenericProducts);

  await knex.schema.createTable("product", (table) => {
    table.uuid("id").primary();
    table.uuid("product_type_id").references("product_type.id").notNullable();
    table.string("name", 255).notNullable();
    table.uuid("brand_id").references("brand.id").notNullable();
    table.string("barcode", 255);
    table.text("image_url");
    table.string("added_by", 100).notNullable();
    betterTimestamps(table);
  });

  return;
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("product");
  await knex.schema.dropTableIfExists("product_type");
  await knex.schema.dropTableIfExists("brand");
  return;
};

const basicGenericBrands = [
  {
    id: "b2fae36c-1fa9-427d-bc57-4db78a36fb1e",
    name: "Coca Cola",
  },
  {
    id: "55e462dc-02d3-4a28-8cce-d113596f8801",
    name: "Pepsi",
  },
  {
    id: "51b912a3-5580-44d4-a766-e9743a1396f3",
    name: "Doritos",
  },
  {
    id: "380097c3-9ab7-41ec-bb7e-951659640d65",
    name: "Rema1000",
  },
  {
    id: "ed5e4cf1-ec54-4c53-96b7-4a5d18035686",
    name: "First Price",
  },
  {
    id: "8392fd86-0c48-437c-a183-f3e1b913995b",
    name: "Cocio",
  },
  {
    id: "1c2d59e7-3d26-43ea-9371-b83d05a89e18",
    name: "Stryhns",
  },
  {
    id: "5eec4ccf-cdfd-409d-a8a2-3412da5301e1",
    name: "Glyngøre",
  },
  {
    id: "0104c8af-7219-4b49-8efe-09df0b4e8a46",
    name: "Chiquita",
  },
];

const basicGenericProducts = [
  {
    id: "460b71a4-0b56-48d1-addf-19a0e0118972",
    name: "Mælk",
    description: "Alle varianter af mælk",
  },
  {
    id: "7f38ac03-8a52-4ef6-96f3-88dbf39e95f0",
    name: "Nutella",
    description: "Alle varianter af nutella, også kopier",
  },
  {
    id: "7b3249b7-67e0-4643-93da-a67dc048ce88",
    name: "Sodavand",
    description: "Alle varianter af sodavand",
  },
  {
    id: "b1ed992f-51d3-4e79-a583-7134a8be2c24",
    name: "Øl",
    description: "Alle varianter af øl",
  },
  {
    id: "ee15294e-01b9-411d-9385-b52332092dbb",
    name: "Chips",
    description: "Alle varianter af chips",
  },
  {
    id: "658d5b0b-f806-400d-96fe-436995ae3405",
    name: "Kartofler",
    description: "Alle varianter af rå kartofler",
  },
  {
    id: "dff604d3-c444-47a2-b92b-9486719d846f",
    name: "Peberfrugt",
    description: "Alle varianter af peberfrugt",
  },
  {
    id: "39dbe037-dd17-4ba1-8a9b-f3201fbbb6d8",
    name: "Ketchup",
    description: "Alle varianter af chips",
  },
  {
    id: "de2731e6-8516-42f9-b306-b311319f5a35",
    name: "Remoulade",
    description: "Alle varianter af chips",
  },
  {
    id: "48eac6b8-d76a-4312-8d63-d17f482ead42",
    name: "Mayonaise",
    description: "Alle varianter af chips",
  },
  {
    id: "c31e55c3-b218-4a1e-aa26-542530fd1ea1",
    name: "Senep",
    description: "Alle varianter af chips",
  },
  {
    id: "ec280852-c507-453f-84e4-63afb01d716f",
    name: "Ris",
    description: "Alle varianter af chips",
  },
  {
    id: "0ceaa59d-6f52-4eea-8f69-45755d5ea39c",
    name: "Pasta",
    description: "Alle varianter af chips",
  },
  {
    id: "92ee3d5a-f888-46eb-b18a-a161f7c6e36b",
    name: "Nudler",
    description: "Alle varianter af chips",
  },
  {
    id: "0c819114-c0f7-45a1-83aa-d1bec919de9b",
    name: "Agurk",
    description: "Alle varianter af chips",
  },
  {
    id: "be9ec347-d16e-4a92-a769-466ab1358c2a",
    name: "Porrer",
    description: "Alle varianter af chips",
  },
  {
    id: "11456a58-75c0-4aec-b81a-59e80b965162",
    name: "Karrypasta",
    description: "Alle varianter af chips",
  },
  {
    id: "ae808b77-4b18-43b5-a3e6-8633221eaba5",
    name: "Bacon",
    description: "Alle varianter af chips",
  },
  {
    id: "a34f9cbe-08a8-4052-99ba-2f72740745a0",
    name: "Oksekød",
    description: "Alle varianter af chips",
  },
  {
    id: "feccd268-117c-4a59-a85f-3d81bdf3fc97",
    name: "Kylling",
    description: "Alle varianter af chips",
  },
  {
    id: "aa12c611-634e-4e5f-9803-ebc165a6b36c",
    name: "Svinekød",
    description: "Alle varianter af chips",
  },
  {
    id: "071fa945-a3bc-4caa-939c-7cb38ce70ccb",
    name: "Chokolade",
    description: "Alle varianter af chips",
  },
];
