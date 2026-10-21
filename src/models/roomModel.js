import pool from "../config/db.js"

// Search for user's rooms that they are in so that, as an example of one thing you could do, you can join them to those rooms
export const getUserRooms = async (id) => {
    const response = await pool.query(`
        SELECT roomname
        FROM j_usersrooms
        WHERE userid = $1`, [id]);

    const result = response.rows
    console.log('response : ', response)
    console.log('search for rooms user is in : result : ', result)

    return result;
}



export const getXmessagesInARoom = async(roomName, numOfMessages) => {
    // This func fetches the top x/numOfMessages messages from a room ordered by the date created
    // To get the top x messages in postgresql, we can use the LIMIT keyword, followed by the number of records we want
    
    console.log('roomName : ', roomName);
    console.log('numOfMessages : ', numOfMessages);
    const response = await pool.query(`
        SELECT messages.content, users.username, users.id
        FROM messages, users
        WHERE sent_in_room = $1 
            AND messages.sent_by = users.id
        ORDER BY messages.created_at DESC
            LIMIT $2`, [String(roomName), numOfMessages]);
    
    const result = response.rows
    console.log('response : ', response)
    console.log('search for rooms user is in : result : ', result)

    return result;
}

// Get a list of all the users (usernames) in a room
export const getAListOfUsersInARoom = async(roomName) => {
    console.log('model FUNC getRoomsAUserIsIn called')

    const response = await pool.query(`
        SELECT users.username, users.id
        FROM j_usersrooms, users
        WHERE j_usersrooms.roomname = $1 and j_usersrooms.userid = users.id;`, [roomName]);

    const result = response.rows;
    
    // const result = Object.values(result1) // this could have been true: .values() VERY helpfully discards the keys of a given dictionary, and keeps the values, and puts them into a list, doing exactly what we need it to in this case, but it isn't in our case, because our case is many dictionaries sandwiched into one list.

    // const result = [];
    // for (let i = 0; i < result1.length; i++) {
    //     result.push(result1[i]['username']);
    // }

    console.log('response : ', response);
    console.log('result : ', result);

    return result;
}


export const getAListOfUsersInARoomAndTheirStatuses = async(roomName) => {
    console.log('model FUNC getAListOfUsersInARoomAndTheirStatuses called')

    const response = await pool.query(`
        SELECT users.username, 
        FROM j_usersrooms, users
        WHERE j_usersrooms.roomname = $1 and j_usersrooms.userid = users.id;`, [roomName]);

    const result1 = response.rows;
    
    // const result = Object.values(result1) // this could have been true: .values() VERY helpfully discards the keys of a given dictionary, and keeps the values, and puts them into a list, doing exactly what we need it to in this case, but it isn't in our case, because our case is many dictionaries sandwiched into one list.

    const result = [];
    for (let i = 0; i < result1.length; i++) {
        result.push(result1[i]['username']);
    }

    console.log('response : ', response);
    console.log('result : ', result);

    return result;
}