// path: express/config/routes.js

import express from 'express';
import { login } from '../controllers/api/sessionsController.js';
import { create } from '../controllers/api/usersController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/usuarios', create);

router.get('/perfil', authenticateToken, (req, res) => {
  res.send(req.user);
});

export default router;