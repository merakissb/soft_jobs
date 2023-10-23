// path: express/controllers/api/usersController.js

import { pool } from '../../db/pool.js';

// email, password, rol y lenguage son los input que se reciben del formulario
export const create = async (req, res) => {
    const { email, password, rol, language } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const queryText = 'INSERT INTO users (email, password, rol, language) VALUES ($1, $2, $3, $4) RETURNING *';
        const queryValues = [email, password, rol, language];
        const { rows: [user] } = await client.query(queryText, queryValues);
        await client.query('COMMIT');
        res.status(201).json(user);
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: e });
    } finally {
        client.release();
    }
    }