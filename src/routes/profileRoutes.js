import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { addExtraInformationToReqUsers } from '../middleware/addExtraInfoMW.js';

const router = express.Router();

router.get('', verifyToken, addExtraInformationToReqUsers, (req, res, next) => {
    
    
    
    res.render('pages/profilePage/index.ejs', {
        'created_at': req.user.created_at,
        'user': req.user,

    })
    // res.status(200).json({
    //     'status':'200',
    //     'messages': 'temp hoorah'
    // })
});

export default router;