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

  await knex.schema.createTable("country", (table) => {
    table.string("code", 2).primary();
    table.text("name").notNullable();
  });

  await knex("country").insert(countries);

  await knex.schema.createTable("user_house_role", (table) => {
    table.text("role").primary();
  });

  await knex("user_house_role").insert(roles);

  await knex.schema.createTable("house", (table) => {
    table.uuid("id").primary();
    table.string("name", 255).notNullable();
    table.string("country_code", 2).references("country.code");
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

  await knex.schema.createTable("brand", (table) => {
    table.uuid("id").primary();
    table.string("name", 255).notNullable();
    table.string("country_code", 2).references("country.code");
    betterTimestamps(table);
  });

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
    table.string("barcode", 255).notNullable();
    table.text("image_url");
    table.uuid("added_by").references("user.id").notNullable();
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

  await knex.schema.createTable("product_entry", (table) => {
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
  await knex.schema.dropTableIfExists("product_entry");
  await knex.schema.dropTableIfExists("product");
  await knex.schema.dropTableIfExists("product_type");
  await knex.schema.dropTableIfExists("brand");
  await knex.schema.dropTableIfExists("user_house");
  await knex.schema.dropTableIfExists("location");
  await knex.schema.dropTableIfExists("house");
  await knex.schema.dropTableIfExists("user_house_role");
  await knex.schema.dropTableIfExists("user");
  return;
};

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
    name: "Cola",
    description: "Alle varianter af cola",
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

const roles = [{ role: "ADMIN" }, { role: "USER" }];

const countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cote D'Ivoire", code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People'S Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People'S Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];
