// path: express/controllers/api/sessionsController.js

import { pool } from '../../db/pool.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, 'az_AZ', { expiresIn: '24h' });
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user.rows[0]);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};