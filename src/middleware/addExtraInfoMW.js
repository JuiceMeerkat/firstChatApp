import { getCreated_atAndEmailFromUserId } from "../models/userModel.js"


export const addExtraInformationToReqUsers = async (req, res, next) => {
    // This MW (middleware) func is basically only used when accessing the account route, because that is when you will need your created_at field as well as the ones in the req.user / decoded jwt
    
    // fetch the username and created_at, because that is what is missing from the req.user object
    console.log("addExtraInformationToReqUsers FUNC called");

    const response = await getCreated_atAndEmailFromUserId(req.user.id);
    // req.user.username = response.username;
    req.user.created_at = response.created_at;
    req.user.email = response.email;

    console.log('NEW AND IMPROVED req.user : ', req.user);

    next();
}