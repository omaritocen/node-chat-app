let socket = io();

socket.on('connect', function() {
    console.log('Server connected');
});

//FROM SERVER TO CLIENT
socket.on('disconnect', function() {
    console.log('Server disconnected');
});

socket.on('newMessage', function(message) {
    console.log(message);
});

