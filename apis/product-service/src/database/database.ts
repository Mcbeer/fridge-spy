import { knex } from "knex";
import knexfile from "../../knexfile";

const knexConfig = knexfile[process.env.NODE_ENV || "development"];

export const database = knex(knexConfig);
