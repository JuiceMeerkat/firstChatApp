import { addNewIntermediateFeatureCommentToNewFeatureTable, getPendingNewFeatures, changeStateOfNewFeature, getAllNewFeatures, changeStateAndIsImplementedOfNewFeature, changeIsImplementedOfNewFeature, getPendingAndApprovedNewFeatures } from "../models/newFeaturesHandling.js";


export const updateNewFeatureCommentToNewFeatureTableController = async (req, res, next, content, sent_by) => {
    console.log('updateNewFeatureCommentToNewFeatureTableController FUNC called');
    
    const newState = req.body.newState;
    const newIsImplemented = req.body.newIsImplemented;
    const newFeatId = req.body.newFeatId;

    console.log('newState : ', newState);
    console.log('newIsImplemented : ', newIsImplemented);
    console.log('newFeatId : ', newFeatId);

    let response;

    if ( ((newState != 'approved') && (newIsImplemented == true)) && (newFeatId == null)){
        console.log('Error occured.');
        console.log("((newState != 'approved') && (newIsImplemented == true))");
        return res.status(400).json({
            'status': '400',
            'message': '400 bad request from client',
            'meaning': "An error ooccured. It could be because: is_implemented cannot equal true if state doesn't equal approved. Another option is you've haven't given a value for state or is_implemented. Another option is you haven't given us an id for the new feature",
            "newState": newState,
            "newIsImplemented": newIsImplemented
        })
    } else if ( ((newState == 'approved') || (newState == 'pending') || (newState == 'deleted')) && (newIsImplemented == null)) {
        console.log("else if ( ((newState == 'approved') || (newState == 'pending') || (newState == 'deleted')) && (newIsImplemented == null))");
        response = await changeStateOfNewFeature(newState, newFeatId);

    } else if ( ((newIsImplemented == true) || (newState == false)) && (newState == null) ) {
        console.log("else if ( ((newIsImplemented == true) || (newState == false)) && (newState == null) )");
        response = await changeIsImplementedOfNewFeature(newIsImplemented, newFeatId);

    } else if ( ((newState == 'approved') || (newState == 'pending') || (newState == 'deleted')) && ( (newIsImplemented == true) || (newIsImplemented == false)) ) {
        console.log("else if ( ((newState == 'approved') || (newState == 'pending') || (newState == 'deleted')) && ( (newIsImplemented == true) || (newIsImplemented == false)) )");

        response = await changeStateAndIsImplementedOfNewFeature(newState, newIsImplemented, newFeatId);
        
    } else {
        consle.log("ELSE on newFeatureController. Investigate this bcos it shouldn't have happened");
    }

    

    return response;
};

export const addNewIntermediateFeatureCommentToNewFeaturesTableController = async (content, sent_by) => {
    const response = await addNewIntermediateFeatureCommentToNewFeatureTable(content, sent_by);

    return response;
};


export const getNewPendingFeaturesController = async () => {
    const response = await getPendingAndApprovedNewFeatures();

    return response;
};

export const getAllNewFeaturesController = async () => {
    console.log('getAllNewFeaturesController CONTROLLER called');
    const response = await getAllNewFeatures();

    return response;
};