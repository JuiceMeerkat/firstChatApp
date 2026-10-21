import express from "express"
import verifyToken from "../middleware/authMiddleware.js";
import { joinRoom, getUserRooms, getAllRooms, leaveRoom} from "../controllers/roomsController.js";


const router = express.Router()

router.post('/joinRoom', verifyToken, (req, res, next) => joinRoom(req, res, next));

router.get('/getUserRooms', verifyToken, (req, res, next) => getUserRooms(req, res, next));

router.get('/getAllRooms', verifyToken, (req, res, next) => getAllRooms(req, res, next));

router.delete('/leaveRoom', verifyToken, (req, res, next) => leaveRoom(req, res, next));


export default router