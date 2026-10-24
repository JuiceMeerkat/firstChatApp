// This is the socket stuff script
console.log('socket script online');
console.log('window.location.pathname : ', window.location.pathname);

const notificationsListR = document.querySelector('#notificationsList');
console.log('notificationsListR : ', notificationsListR);

let isItChat = false;

const testingVARIABLE = 5;
console.log('in socketStuff.js testingVARIABLE : ', testingVARIABLE);

if (window.location.pathname === '/chat') {
    isItChat = true;
}
// console.log('aaa : ', aaa);

// CONNECTION TO WS SERVER
// connecting socket - for local testing (better for portable versions)
// const socket = io('ws://localhost:5001/chat')
// connecting socket - for local testing (better for multi-user versions)
const socket = io(`${window.location.origin.replace(/^http/, 'ws')}/chat`, {
    transports: ['websocket', 'polling']
});



// SOCKET EVENTS

// Listening to messages from other clients, put through the server
socket.on('E_ServerToCliMessage', async (data) => {
    console.log('E_ServerToCliMessage received');
    console.log('data : ', data);

    const {content, username, id, room} = data;
    console.log('content : ', content);
    console.log('username : ', username);
    console.log('id : ', id);
    console.log('room : ', room);

    // Now handle the event
    // Discard if the user does not currently have selected the same room as the message has come from
    if ((isItChat) && (room == roomUserCurrentlyIn)) {
        console.log('room == roomUserCurrentlyIn')
        console.log('room : ', room);
        console.log('roomUserCurrentlyIn : ', roomUserCurrentlyIn);
        
        const data = {
            "content": content,
            "username": username,
            "id": id
        };
        
        const userId = await whoami();
        console.log('userId : ', userId);
        
        addMessage(data, userId, 'bottom');
    } else {
        notificationsListR.appendChild(createNewNotification(room, `${username}: ${content}`, 10000));
    }
})



// Listening to if YOU/CLIENT joined a room
socket.on('P_E_YouJoinedRoom', (data) => {
    console.log('event P_E_YouJoinedRoom received from socket');
    if (isItChat) {
        console.log('data : ', data)
        const { room } = data;
        console.log('room : ', room);

        addChatSelector(room);
    }

})

// Listening for jwt_expired event
socket.on('jwt-expired', (arg) => {
    console.log('arg : ', arg)
    console.log('apparently your jwt has expired.')
})

// Just for testing
socket.on('E_forward', (data) => {
    console.log('data : ', data);
})

// FUNCTIONS

const emitRequestPeopleAndStatusesEvent = (room) => {
    socket.emit('E_CliToServerRequestStatusesOfPeopleInRoom', room);
}

const emitE_CliToServerJoinRoom = (room) => {
    data = {"room": room}
    socket.emit("E_CliToServerJoinRoom", data);
}

const emitE_ClientToServerRequestToLeaveRoom = (room) => {
    console.log('(socketStuff.js) emitE_ClientToServerRequestToLeaveRoom FUNC called');
    socket.emit('E_ClientToServerRequestToLeaveRoom', room);
}

// console.log('so we got here btw')
window.emitRequestPeopleAndStatusesEvent = emitRequestPeopleAndStatusesEvent;
window.emitE_CliToServerJoinRoom = emitE_CliToServerJoinRoom;
window.emitE_ClientToServerRequestToLeaveRoom = emitE_ClientToServerRequestToLeaveRoom;

console.log('to compare with this index.js in chatpage.ejs, here is the socket variable (socket) : ', socket);