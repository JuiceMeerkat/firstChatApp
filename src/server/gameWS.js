import pool from "../config/db.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";

import { getUserByIdModel } from "../models/userModel.js";

export default function createGameServer(io) {
    const game = io.of('/game')

    game.use(async (socket, next) => {
        console.log(' game.use MIDDDLEWARE!!!');

        try {
            const cookieHeader = socket.handshake.headers.cookie;
            console.log('game cookieHeader : ', cookieHeader);


            const cookies = cookie.parse(cookieHeader)
            const token = cookies.token
            console.log('game cookies : ', cookies);
            console.log('game token : ', token);

        
            const decodedCookie = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedCookie.id;
            console.log('game decodedCookie : ', decodedCookie);
            console.log('game userId : ', userId);

            console.log('game userId : ', userId);

            const result = await getUserByIdModel(userId);


            // console.log('response : ', response);
            console.log('game result : ', result);

            socket.userStats = result;

            next();
        } catch(err) {
            console.log('game catch of io.use MIDDDLEWARE!!')
            console.log('game err :', err)
            socket.emit('game jwt-expired', 'the jwt has expired <i> we believe </i>')
            socket.disconnect();
            // return res.status(401).json({"message": "we <i> believe </i> the jwt is expired"})
        }
    })


    game.on('connection', (socket) => {
        console.log('CONNECTED game.on')

        game.emit('E_forward', {'hello':'hello'})

        socket.on('blah', data => {
            console.log('data')
        })

        socket.on('E_forward', (data) => {
            console.log('arg : ', data)
            // game.emit('E_forward', {"message":"hello everybody, thanks for coming"})
        })
    })

    





    // game.engine.on('connection_error', (err) => {
    //     console.log(err.req);      // the request object
    //     console.log(err.code);     // the error code, for example 1
    //     console.log(err.message);  // the error message, for example "Session ID unknown"
    //     console.log(err.context);  // some additional error context
    // })



}