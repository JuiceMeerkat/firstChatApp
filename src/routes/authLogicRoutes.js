import express from "express";
import {register, login} from '../controllers/authController.js'
import validateInput from "../middleware/inputValidation.js";

const router = express.Router();

router.post('/register', validateInput, register);
router.post('/login', login);

export default router;