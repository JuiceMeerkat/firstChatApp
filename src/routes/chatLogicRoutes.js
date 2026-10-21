import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
const router = express.Router();

import { fetchXmessagesFromRoom, getUsersInARoom } from '../controllers/chatController.js';

router.post('/loadMessages', verifyToken, (req, res, next) => fetchXmessagesFromRoom(req, res, next));

router.post('/peopleInRoom', verifyToken, (req, res, next) => getUsersInARoom(req, res, next));

// router.post('peopleInRoomAndStatuses', verifyToken, (req, res, next) => 

export default router;