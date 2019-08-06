const path = require('path');
const express = require('express');

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
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    //EMIT TO EVERYONE EXCEPT THE CONNECTED SOCKET
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'a new user has joined the chat',
        createdAt: new Date().getTime()
    });
    
    //FROM CLIENT TO SERVER
    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // SEND TO EVERYBODY BUT NOT THIS SOCKET
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});