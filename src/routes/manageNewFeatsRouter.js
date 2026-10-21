import express from 'express';
import { softAuth } from '../middleware/softAuth.js';
import verifyToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, softAuth, authorizeRoles('admin', 'manager'), (req, res, next) => {
    console.log('/ (get) route called on manageNewFeatsRouter')
    
    res.render('pages/manageNewFeatsPage.ejs', {
        user: res.locals.user
    });

});

export default router;