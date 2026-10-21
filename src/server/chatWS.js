
import cookie from "cookie";
import jwt from "jsonwebtoken";

import { getUserByIdModel } from "../models/userModel.js";
import { getUserRooms } from "../models/roomModel.js";
import { insertMessage } from "../models/messagesModel.js";

// process.env.NODE_ENV === "production" ? false : ["http://localhost:5001", "http://127.0.0.1:5001", "http://127.0.0.1:3000"]

// NOTES:
// E_ before an event is an easier way to remind the programmer that is an event than saying event at the beginning/end
// P_ means its a private/one-on-one message only


export default function createChatServer(io) {
    console.log('created chat server FUNC called');
    console.log('io.use middleware made');

    const chat = io.of('/chat')

    chat.use(async (socket, next) => {
        console.log(' chat.use MIDDDLEWARE!!!');

        try {
            const cookieHeader = socket.handshake.headers.cookie;
            console.log('cookieHeader : ', cookieHeader);


            const cookies = cookie.parse(cookieHeader)
            const token = cookies.token
            console.log('cookies : ', cookies);
            console.log('token : ', token);

        
            const decodedCookie = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedCookie.id;
            console.log('decodedCookie : ', decodedCookie);
            console.log('userId : ', userId);

            console.log('userId : ', userId);

            const result = await getUserByIdModel(userId);


            // console.log('response : ', response);
            console.log('result : ', result);

            socket.userStats = result;

            next();
        } catch(err) {
            console.log('catch of io.use MIDDDLEWARE!!')
            console.log('err :', err)
            socket.emit('jwt-expired', 'the jwt has expired <i> we believe </i>')
            socket.disconnect();
            // return res.status(401).json({"message": "we <i> believe </i> the jwt is expired"})
        }
    })
    console.log("chat.on('connection') middleware made"); // Referring to the above, I believe

    chat.on('connection', async (socket) => {
        // console.log('frocket socket : ', socket)
        console.log(`User connected, socket.id : ${socket.id}`);
        console.log('socket.userStats : ', socket.userStats);

        // console.log('right before ')
        // socket.join('some-room')
        // console.log('after')

        // Search for users rooms that they are in so you can join them to those rooms
        const result = await getUserRooms(socket.userStats.id);
        

        console.log('MUSTARD socket.id : ', socket.id)

        const roomsList = []
        while (result.length != 0 && result.length  != undefined) {
            const currentObj = result.splice(0, 1)[0]
            let currentRoom = currentObj.roomname
            console.log('currentObj : ', currentObj);
            console.log('currentRoom : ', currentRoom);
            roomsList.push(currentRoom)
            socket.join(currentRoom)
            // console.log({'message':`socket ${socket.userStats} has joined the room ${currentRoom}`, 'room':currentRoom, 'username': socket.username})
            console.log('socket.userStats.username : ', socket.userStats.username)
            chat.to(currentRoom).emit('E_SomeoneJoinedRoom', 
                {'message':`socket ${socket.userStats} has joined the room ${currentRoom}`, 'room':currentRoom, 'username': socket.userStats.username})

            // Send event basically reminding client code to 'addMessage' to bar thingy called P_E_YouJoined. use io.to(socket.id).emit()
            chat.to(socket.id).emit('P_E_YouJoinedRoom', {'room': currentRoom})
        }

        // When a message is sent
        
        socket.on('E_CliToServerMessageAndRoom', data => {
            console.log('messageSendEvent event received')
            console.log('nimgy data : ', data);
            // socket.send(data)
            try {
                const {message, room} = data;
                console.log('message : ', message);
                console.log('room : ', room);

                chat.to(room).emit('E_ServerToCliMessage', {
                    "content": message,
                    "username":socket.userStats.username,
                    "id": socket.userStats.id,
                    "room": room
                })
                console.log('socket.userStats : ', socket.userStats);
                // Insert into messages table the message: data
                const response = insertMessage(message, socket.userStats.id, room)
            } catch(err) {
                console.log('ERROR OCCURED IN E_CliToServerMessageAndRoom')
                console.log('err : ', err)
            }


        })

        socket.on('E_CliToServerRequestStatusesOfPeopleInRoom', (room) => {
            console.log('E_CliToServerRequestStatuses event received')
            // console.log('data : ', data);
            // const room = data.room;

            console.log('room : ', room);

            console.log("io.sockets.adapter.rooms.get('test-room') : ", io.sockets.adapter.rooms.get('test-room')); // gives undefined, which isn't nothing, but isn't that helpful

            // io.in(room_name).clients((err , clients) => {
            //     console.log(
            //     // clients will be array of socket ids , currently available in given room
            // });
            

            // After some google(AI)-ing, I have realised you can get not just the socket ids of sockets in a room, but the users stats for each of those sockets as well.
            // console.log('chat : ', chat)
            // console.log('chat.sockets : ', chat.sockets);
            // const socket = chat.sockets.get(socketId) // syntax
            // console.log('snahu : ', snahu)
            // console.log('chat.adapter : ', chat.adapter)
            // console.log('chat.adapter.rooms : ', chat.adapter.rooms)
            // let ES6SETofPeopleInRoom  = chat.adapter.rooms.get(room); 
            // console.log('ES6SETofPeopleInRoom : ', ES6SETofPeopleInRoom)
            // WORKSSSS WOOOOHOOOOO
            // console.log('socket.userStats : ', socket.userStats);

            // Remember that, for the things above, chat is just io.of('/chat')

            // console.log('io : ', io)
            // console.log('io.rooms : ', io.rooms);
            // console.log('io.sockets : ', io.sockets)
            // console.log('io.sockets.clients : ', io.sockets.clients)

            // console.log('socket : ', socket);
            // console.log('socket.rooms : ', socket.rooms); // GETS A LIST OF ALL ROOMS THE SOCKET (USER) IS IN. good stuff this
            // console.log(io.sockets.clients())


            // USING ALL THE (RE)SEARCHING FROM ABOVE
            // console.log('chat : ', chat);

            console.log('chat.sockets : ', chat.sockets);

            console.log('chat.adapter : ', chat.adapter);
            console.log('chat.adapter.rooms : ', chat.adapter.rooms);
            console.log('room (reminder) : ', room);
            let ES6SETofPeopleInRoom = chat.adapter.rooms.get(room); // .get() is syntax for a special data type introduced in ES6 (javascript 6)
            console.log('ES6SETofPeopleInRoom : ', ES6SETofPeopleInRoom);

            if (ES6SETofPeopleInRoom == undefined) {
                console.log('error occured: room ', room, " does not exist.")
                // return res.json({
                //     "status": "404 Not found",
                //     "message": `The resource you are trying to find, room ${room}, could not be found.`
                // })
                return
            }

            // So now, we have an array of all the socket id's in the room, and we have a something which has all the sockets in the room, and all the data attached to each, so we can use them to figure out the names of all the people in the room!!!
            // const size = ES6SETofPeopleInRoom.size; // For js Sets, you use .size, not .length
            // console.log('size : ', size);

            // Radnom:
            // console.log('i : ', i);
            // const currentSocket = ES6SETofPeopleInRoom[i]
            // console.log('currentSocket : ', currentSocket);
            // tempUserStats = chat.sockets.get(currentSocket)


            
            const myIterator = ES6SETofPeopleInRoom.entries()
            let listOfSocketIds = [];
            for (const value of myIterator) {
                console.log('value : ', value);
                listOfSocketIds.push(value[0]);
            }

            console.log('listOfSocketIds : ', listOfSocketIds);
            // aaaaaaand FINALLLYYYY, we have a list of the sockets, in a given room. PHEW and woohoooooooo :)

            // Now we can check their stats from the chat.sockes thingy and add all the usernames to one big beautiful list.
            const dataList = [];
            for (let i = 0; i < listOfSocketIds.length; i++) {
                console.log('i : ', i);
                console.log('listOfSocketIds[i] : ', listOfSocketIds[i]);
                const currentSocketId = listOfSocketIds[i]

                const currentSocket = chat.sockets.get(currentSocketId);
                // console.log('currentSocket : ', currentSocket);
                // WOOOOO it works :)

                const tempSocketData = {"id": currentSocket.userStats.id, "username": currentSocket.userStats.username};
                console.log('tempSocketData : ', tempSocketData);
                dataList.push(tempSocketData);
            }

            console.log('list of the usernames and ids of people who are in the specificed room and are online (dataList): ', dataList);

            socket.emit('E_ServerToCliStatusesOfPeopleInRoom', dataList);

            // let listOfUsernames = new Array(); // Just felt like declaring an array this way
            // const socketsIterator = chat.sockets.entries()
            // console.log('socketsIterator : ', socketsIterator);

            // for (const element of socketsIterator) { // Important!: Remember to use of, not in when you are dealing with iterators of set/maps in ES6
            //     const socketInChatNamespace = element[0]
            //     console.log('socketInChatNamespace : ', socketInChatNamespace);
            //     listOfUsernames.push(socketInChatNamespace);
            // }
            
            // console.log('List of people online, in the chat namespace : ', listOfUsernames);
            

            // socket.io has decided to use sets, which if you haven't used them before, seem hard. No worries though, we'll just research sets. So sets don't accept index, so you could say mySet[1] to get the 2nd value in the Set for instance. Instead, you have to do this: 

            // data = [
            //     {
            // ]
            // socket.emit('E_ServerToCliStatusesOfPeopleInRoom', 
        })
        
        // Handling disconnections
        console.log('handling disconnections code up ahead')
        socket.on('disconnecting', async () => {
            console.log("oh, that's sad.", socket.id, " is leaving us. We'll be sad to see you go, ", socket.id, ".");
            console.log("formal event: disconnecting");
            
            const rooms = await getUserRooms(socket.userStats.id);
            console.log('rooms : ', rooms);
            for (const roomIndex in rooms) {
                console.log('roomIndex : ', roomIndex); // roomIndex is a number which starts at 0 and goes up to the lengtht of rooms minus 1
                
                const roomObj = rooms[roomIndex];
                console.log('roomObj : ', roomObj);

                const room = roomObj['roomname'];
                const event = 'E_someoneDisconnected';
                const data = {"roomName": room}
                chat.to(room).emit(event, data);
            }
        })
        socket.on('disconnect', () => {
            console.log("oh, that's sad.", socket.id, " is leaving us. We'll be sad to see you go, ", socket.id, ".");
            console.log("formal event: disconnect");
        })


        // Handling if a user wants to join a room while connected
        socket.on('E_CliToServerJoinRoom', async (data) => {
            console.log('E_CliToServerJoinRoom Event called');
            
            let {room} = data;
            console.log('room : ', room);
            console.log('data : ', data);

            // Check if the user is in that room
            const response = await getUserRooms(socket.userStats.id);
            console.log('response : ', response);

            let listOfRooms = []
            for (let i = 0; i < response.length; i++) {
                let room = response[i]['roomname'];
                listOfRooms.push(room);
            }
            console.log('listOfRooms : ', listOfRooms);

            if (listOfRooms.includes(room)) {
                console.log('According to the DB, you are indeed in that room!');
                socket.join(room);
                
                // Notify the members of the group that someone has joined their chat, so that they can update their people and statuses list
                chat.to(room).emit('E_SomeoneJoinedRoom', 
                {'message':`socket ${socket.userStats} has joined the room ${room}`, 'room':room, 'username': socket.userStats.username});
            } else {
                console.log('How dare thy, thy aren"t in this room!');
                return
            }

        })

        socket.on('E_ClientToServerRequestToLeaveRoom', async (room) => {
            console.log('E_ClientToServerRequestToLeaveRoom Event called');
            console.log('room : ', room);

            socket.leave(room);
            chat.to(room).emit('E_someoneLeftARoom', room);

        })
        
    })

    // Testing something
    chat.adapter.on("create-room", (room) => {
        console.log("create-room event called. room ", room, " was created.")
    })
}
