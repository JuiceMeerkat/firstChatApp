import pool from "../config/db.js";
import express from "express";
import { signout } from "../controllers/authController.js";
import { softAuth } from "../middleware/softAuth.js";

const router = express.Router();

router.get('/register', softAuth, (req, res) => {
    console.log('register called')
    return res.render('pages/register/index.ejs', {
        user: res.locals.user
    })
});

router.get('/login', softAuth, (req, res) => {
    console.log('login called')
    return res.render('pages/login/index.ejs', {
        user: res.locals.user
    })
})


router.get('/signout', signout);

export default router;