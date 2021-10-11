// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import knexFile from "../../knexfile.js";
import { knex } from "knex";

const knexConfig = knexFile[process.env.NODE_ENV];

export const database = knex(knexConfig);
