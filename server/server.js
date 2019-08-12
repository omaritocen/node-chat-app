const path = require('path');
const express = require('express');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//EXPRESS APP MIDDLEWARE
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    // EMIT ONLY TO THE CONNECTED SOCKET
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //EMIT TO EVERYONE EXCEPT THE CONNECTED SOCKET
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'a new user has joined the chat'));
    
    //FROM CLIENT TO SERVER
    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});