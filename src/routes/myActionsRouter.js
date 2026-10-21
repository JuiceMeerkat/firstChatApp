import express from 'express';
import { softAuth } from '../middleware/softAuth.js';

const router = express.Router();

router.get('/', softAuth, (req, res, next) => {

    res.render('pages/myActionsPage/index.ejs', {
        user: res.locals.user
    });

    // res.status(500).json({
    //     "status": 500,
    //     "message": "temp hoorah"
    // })
});

export default router