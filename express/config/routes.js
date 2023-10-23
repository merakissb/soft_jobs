// path: express/config/routes.js

import express from 'express';
import { login } from '../controllers/api/sessionsController.js';
import { create } from '../controllers/api/usersController.js';

const router = express.Router();

router.post('/login', login);
router.post('/usuarios', create);

export default router;