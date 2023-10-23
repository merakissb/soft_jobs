// path: server.js

import express from 'express';
import cors from 'cors';
import { pool } from './db/pool.js';
import router from './config/routes.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

//routes
app.use('/', router);

//servidor
app.listen(port, () => console.log(`Server running on port ${port}`));

//db
pool.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('Connected to database');
});