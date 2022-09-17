-- Your SQL goes here
-- Setup the auto generation of UUID's
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE shopping_list (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id uuid NOT NULL,
  title varchar(80)
);

CREATE TABLE shopping_list_item (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  shopping_list_id uuid NOT NULL REFERENCES shopping_list(id),
  item_id uuid NOT NULL,
  amount int DEFAULT 1,
  manually_added bool DEFAULT false
);