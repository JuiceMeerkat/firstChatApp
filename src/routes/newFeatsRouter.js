import express from 'express';
// import { verify } from 'jsonwebtoken';
import verifyToken from '../middleware/authMiddleware.js';
import { updateNewFeatureCommentToNewFeatureTableController, addNewIntermediateFeatureCommentToNewFeaturesTableController, getNewPendingFeaturesController, getAllNewFeaturesController } from '../controllers/newFeatureController.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/getNewPendingFeats', async (req, res, next) => {
    console.log('/getNewPendingFeats (get) route called on newFeatsRouter.js');


    const response = await getNewPendingFeaturesController();


    res.status(200).json({
        'status':'200',
        'route': '/ (get)',
        'message': 'temp hoorah',
        'response': response
    })
});

router.get('/getAllNewFeats', async (req, res, next) => {
    console.log('/getAllNewFeats (get) route called on newFeatsRouter.js');

    const response = await getAllNewFeaturesController();
    
    res.status(200).json({
        'status':'200',
        'route': '/ (get)',
        'message': 'temp hoorah',
        'response': response
    })
})


router.put('/updateNewFeat', verifyToken, authorizeRoles('manager', 'admin'), async (req, res, next) => {
    console.log('/ (post) route called on newFeatsRouter.js');


    console.log('req.user : ', req.user)
    // console.log('req.body.newFeatureComment : ', req.body.newFeatureComment);

    const response = await updateNewFeatureCommentToNewFeatureTableController(req, res, next);
    
    
    res.status(200).json({
        'status':'200',
        'route': '/ (post)',
        'message': 'temp hoorah',
        'response': response
    })
});


router.post('/postIntermediateNewFeat', verifyToken, async (req, res, next) => {
    console.log('/postIntermediateNewFeat route called');

    const user_id = req.user.id // We can access req.user because verifyToken has created it
    const newFeatureComment = req.body.newFeatureComment;

    console.log('user_id : ', user_id);
    console.log('newFeatureComment : ', newFeatureComment);

    const response = await addNewIntermediateFeatureCommentToNewFeaturesTableController(req.body.newFeatureComment, req.user.id);

    
    res.status(200).json({
        'status': 200,
        'message': 'temp hoorah',
        'user_id': user_id,
        'newFeatureComment': newFeatureComment
    })
})

export default router;