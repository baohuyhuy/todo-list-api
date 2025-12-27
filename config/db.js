import knex from 'knex';
import { development } from '../db/knexfile.js';

const db = knex(development);

export default db;
