import express from "express";
import { softAuth } from "../middleware/softAuth.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', verifyToken, softAuth, (req, res) => {
    return res.render('pages/chatpage/chatIndex.ejs', {
        user: res.locals.user
    })
    // res.render('pages/chatpage/index.ejs')
})

export default router;
