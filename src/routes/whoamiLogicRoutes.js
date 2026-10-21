import express from 'express';
import { whoamiController } from '../controllers/whoamiController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/whoami', verifyToken, (req, res, next) => whoamiController(req, res, next));

export default router;