import express from "express"
import cors from "cors"
import util from "util"
import cookieParser from "cookie-parser"
import { Server } from 'socket.io'
import cookie from "cookie"
import jwt from "jsonwebtoken";
import favicon from 'serve-favicon';

console.log(' lib cooks : ', cookie);

import dotenv from "dotenv"
dotenv.config();


import pool from '../config/db.js'
import errorHandling from '../middleware/errorHandler.js';
import path from "path";
import { intercept } from "../middleware/interceptRequests.js"
import { decode } from "punycode";

import authLogicRoutes from '../routes/authLogicRoutes.js'
import userRoutes from '../routes/userRoutes.js'
import welcomeRoutes from '../routes/welcomeRoute.js'
import authRoutes from "../routes/authRoutes.js"
import chatRoutes from '../routes/chatRoutes.js'
import joinRoomRouter from "../routes/roomsRouter.js"
import newFeatsRouter from '../routes/newFeats.js'
import gamesRouter from '../routes/gamesRoutes.js';
import chatLogicRouter from "../routes/chatLogicRoutes.js";
import newFeatsLogicRouter from '../routes/newFeatsRouter.js';
import profileRouter from '../routes/profileRoutes.js';
import manageNewFeatsRouter from '../routes/manageNewFeatsRouter.js';
import myActionsRouter from '../routes/myActionsRouter.js'
import whoamiRouter from "../routes/whoamiLogicRoutes.js"

import createChatServer from "./chatWS.js"
import createGameServer from "./gameWS.js"



console.log('authRoutes : ', authRoutes);

const app = express();

// Socket.io server init
// const io = new Server(3000, {});
// io.on('connection', (socket) => {
//     console.log('CONNNNNECCTED')
// })

// Define a few variables
const __dirname = path.resolve();
console.log('__dirname : ', __dirname)
console.log('express.static(path.join(__dirname, "public")) : ', path.join(__dirname, "public"));

// Define trigger func and create trigger for update on users table
const createTQueryText = `
CREATE OR REPLACE FUNCTION notify_after_insert()
RETURNS TRIGGER AS
$BODY$
    BEGIN
        PERFORM pg_notify('row inserted', row_to_json(NEW)::text);
        RETURN new;
    END;
$BODY$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS new_row_trigger ON users;

CREATE TRIGGER new_row_trigger
AFTER INSERT ON users
FOR EACH ROW EXECUTE PROCEDURE notify_after_insert();
`
pool.query(createTQueryText)

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(cookieParser());
// app.use(intercept());
app.use(favicon(path.join(__dirname, 'public', 'favicon', 'favicon.ico')))



// Set the static dir
app.use(express.static(path.join(__dirname, "public")));

// Configure view engine to ejs
app.set('view engine', 'ejs');

// Routes
app.use('/', userRoutes);
app.use('/api', authLogicRoutes);
app.use('/', authRoutes);
app.use('/', welcomeRoutes);
app.use('/chat', chatRoutes);
app.use('/', joinRoomRouter);
app.use('/newFeats', newFeatsRouter);
app.use('/games', gamesRouter);
app.use('/api', newFeatsLogicRouter);
app.use('/profile', profileRouter);
app.use('/manageNewFeats', manageNewFeatsRouter);
app.use('/myActions', myActionsRouter);
app.use('/api', whoamiRouter);

app.use('/api', chatLogicRouter);

// Error handling
// app.use(errorHandling);

//Create table before starting 
// createUserTable();


// Testing POSTGRES connection
// app.get('/', async(req, res) => {
//     const result = await pool.query("SELECT current_database()");
//     console.log('result.rows[0].current_database : ', result.rows[0].current_database);
//     res.send(`The database name is : ${result.rows[0].current_database}`);
// })

// SOCKET.IO STUFF FROM NOW ON IN: ENTER IF YOU DARE


const port = process.env.PORT || 3001
const host = process.env.HOST || '0.0.0.0'

const expressServer = app.listen(port, () => {
    console.log(`running on http://${host}:${port}`);
})

const options = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
}

const io = new Server(expressServer, options);

createChatServer(io);
createGameServer(io);



// io.to('some-room').emit('some-event')
// console.log('just done that')

// Server running
// app.listen(port, () => {
//     console.log(`running on http://${host}:${port}`);
// })