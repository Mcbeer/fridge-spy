// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { knex } from 'knex';
import knexFile from '../../knexfile';

const knexConfig = knexFile[process.env.NODE_ENV || 'development'];

export const database = knex(knexConfig);
