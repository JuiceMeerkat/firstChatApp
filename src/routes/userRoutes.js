import express from "express";
import verifyToken from "../middleware/authMiddleware.js"
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only admin's can access this route
router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({"message": "Welcome admin"})
})

// Only admin's and managers can access this route
router.get('/manager', verifyToken, authorizeRoles('admin', 'manager'), (req, res) => {
    res.json({"message": "Welcome manager"})
})


// All can access this route
router.get('/user', verifyToken, authorizeRoles('admin', 'manager', 'user'), (req, res) => {
    res.json({"message": "Welcome user"})
})




export default router;