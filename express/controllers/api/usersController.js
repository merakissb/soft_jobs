// path: express/controllers/api/usersController.js

import { pool } from '../../db/pool.js';
import bcrypt from 'bcrypt';

// email, password se reciben del formulario
export const create = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: 'INSERT INTO usuarios(email, password) VALUES($1, $2) RETURNING *',
    values: [email, hashedPassword],
  };
  try {
    const result = await pool.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
}