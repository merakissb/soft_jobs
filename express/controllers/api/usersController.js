// path: express/controllers/api/usersController.js

import { pool } from '../../db/pool.js';

// email, password se reciben del formulario
export const create = async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await pool.query(
        'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *',
        [email, password]
        );
        res.json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };