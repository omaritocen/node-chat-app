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
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    let messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {
        messageTextbox.val('');
    });
});

let locationButton = $('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', true).text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function() {
            locationButton.removeAttr('disabled').text('Send location');
        });
    }, function(err) {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.')
    });
});

