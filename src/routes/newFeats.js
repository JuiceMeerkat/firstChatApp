import express from 'express';
import { softAuth } from '../middleware/softAuth.js';
const router = express.Router();

router.get('/', softAuth, (req, res) => {
    res.render('pages/newFeatspage.ejs', {
        user: res.locals.user
    })
})

export default router;