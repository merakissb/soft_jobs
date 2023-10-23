// path: db/pool.js

import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'softjobs',
  port: 5432
});