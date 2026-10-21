import { verify } from "crypto";
import pool from "../config/db.js";


export const joinRoom = async (req, res, next) => {
    console.log('post at /joinRoom')
    console.log(req.body)
    const room = req.body.room
    console.log('room : ', room)
    console.log('req.cookies.token : ', req.cookies.token)

    const response = await pool.query(`
        select * 
        FROM "rooms"
        WHERE "roomName" = $1`, [room]);
    
    const result = response.rows[0]
    // console.log("response : ", response);
    console.log('result : ', result);

    const id = req.user.id

    console.log('id and room : ', id, ' ' , room)

    if (result == undefined) {
        return res.status(404).json({
            "status": 404,
            "message":"We could not find the room you requested"
        })
    } if (result) {
        // First check if the user has already joined that room
        const response = await pool.query(`
            SELECT * 
            FROM j_usersrooms
            WHERE userid=$1 AND roomname=$2`, [id, room])
        const result = response.rows
        console.log('yo so the result is ', result);
        if (!response[0]) {
            try {
                console.log('we reached insert central')
                const response = await pool.query(`
                    INSERT INTO j_usersrooms
                    VALUES ($1, $2)
                    `, [id, room])
                console.log('insert central response : ', response)

                return res.status(200).json({'message': 'Everything went to plan and its working'})
            } catch(err) {
                console.log('error : ', err)
                return res.status(500).json({'message': 'error occured'})
            }
        } else {
            return res.status(500).json({'message': "so, your in already in that room"})
        }
    }
}

export const getUserRooms = async (req, res, next) => {
    console.log('/getUserRooms route called upon');

    const response = await pool.query(`
        SELECT roomname
        FROM j_usersrooms
        WHERE userid = $1`, [req.user.id]);
    
    const result = response.rows;
    console.log('response : ', response);
    console.log('result :', result);

    return res.status(200).json({
        "result": result
    })
}

export const getAllRooms = async (req, res) => {
    console.log('getAllRooms called');

    const response = await pool.query(`
        SELECT * 
        FROM rooms`)
    const result = response.rows
    console.log('response : ', response)
    console.log('result : ', result)

    res.status(200).json(
        {
        "message": "all went to plan. 'result' holds your results", 
        "result": result
    })
}

export const leaveRoom = async (req, res, next) => {
    console.log('leaveRoom called')

    console.log('req.body : ', req.body)
    const roomname = req.body.room
    const userid = req.user.id

    const response = await pool.query(`
        DELETE
        FROM j_usersrooms
        WHERE userid=$1 AND roomname=$2`,
    [userid, roomname])
    console.log('response : ', response)

    return res.status(200).json({
        status: '200',
        'message': "this had nothing before, and I just want it to have something, so I just made it return 200. I don't think it always will be 200 but whatever, I've told you know"
    })
}