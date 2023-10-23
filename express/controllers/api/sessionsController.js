// path: express/controllers/api/sessionsController.js

import { pool } from '../../db/pool.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (user.rows.length === 0) {
      return res.status(401).send('Email or password incorrect');
    }
    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.log(error);
  }
}