import { getXmessagesInARoom, getUserRooms, getAListOfUsersInARoom } from "../models/roomModel.js";

export const fetchXmessagesFromRoom = async (req, res, next) => {
    console.log('/loadMessages route called');
    console.log('req.body : ', req.body);

    const roomName = req.body.roomName;
    const numOfMessages = req.body.numOfMessages;

    const usersRooms = await getUserRooms(req.user.id);
    console.log('usersRooms : ', usersRooms);
    
    let result = null

    const valueFunc = (element) => element.roomname === roomName; // Neat little shorthand way for getting rid of the key in the dictionary, leaving you with only the value.
    // console.log(valueFunc({'key1': 'test-room'}));
    if (usersRooms.some(valueFunc)) {
        console.log('indeed the user IS in the room, all good');
         result = await getXmessagesInARoom(roomName, numOfMessages);

         res.status(200).json({
            'status': '200',
            'message': "everythin' ok",
            "result": result
        })
    } else {
        console.log('USER is NOT in that room, how dare you!');

        res.status(200).json({
            'status': '401',
            'message': "error: unauthorised access. Attempted access to unauthorised group chat messages. Could be fatal for those in the group chat 💀"
        })
    }
    
}

export const getUsersInARoom = async (req, res, next) => {
    console.log('/getUsersInARoom route called');
    console.log('req.body : ', req.body);
    const roomName = req.body.roomName

    const usersRooms = await getUserRooms(req.user.id);
    console.log('usersRooms : ', usersRooms);
    
    let result = null

    const valueFunc = (element) => element.roomname === roomName; // Neat little shorthand way for getting rid of the key in the dictionary, leaving you with only the value.
    // console.log(valueFunc({'key1': 'test-room'}));
    if (usersRooms.some(valueFunc)) {
        console.log('indeed the user IS in the room, all good');
         result = await getAListOfUsersInARoom(roomName);

         res.status(200).json({
            'status': '200',
            'message': "everythin' ok",
            "result": result
        })
    } else {
        console.log('USER is NOT in that room, how dare you!');

        res.status(200).json({
            'status': '401',
            'message': "error: unauthorised access to the list of people in that gc. You must be in the gc to view that piece of data."
        })
    }
}