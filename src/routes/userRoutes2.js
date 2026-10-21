import express from "express"
import { createUser, getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/userController.js'
import validateUser from "../middleware/inputValidation.js";

console.log(validateUser)

const router = express.Router();

router.get('/user', validateUser, getAllUsers);
router.get('/user/:id', validateUser, getUserById);
router.post('/user', validateUser, createUser);
router.put('/user/:id', validateUser, updateUser);
router.delete('/user/:id', validateUser, deleteUser);

// router.get('/user/:id', () => getUserById());
// router.post('/user', () => createUser());
// router.put('/user/:id', () => updateUserById());
// router.delete('/user/:id', () => deleteUserById());

export default router;