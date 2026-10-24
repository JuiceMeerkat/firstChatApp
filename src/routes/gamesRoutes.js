import express from 'express';
import { softAuth } from '../middleware/softAuth.js';

const router = express.Router();

router.get('/', softAuth, (req, res) => {
    res.render('pages/gamepage/index.ejs', {
        user: res.locals.user
    })
})

router.get('/snake', softAuth, (req, res) => {
    res.render('pages/gamepage/snake/index.ejs', {
        user: res.locals.user // from softAuth, and for rendering the dynamically rendered front end ejs page
    })
})

export default router;