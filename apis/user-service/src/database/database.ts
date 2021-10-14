// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { knex } from 'knex';
import knexFile from '../../knexfile.js';

const knexConfig = knexFile[process.env.NODE_ENV];

export const database = knex(knexConfig);
