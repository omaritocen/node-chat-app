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
    
    //FROM CLIENT TO SERVER
    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});