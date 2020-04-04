const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static("public"));

app.set("view engine","ejs");

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <em>' + socket.username + ' join the chat..</em>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <em>' + socket.username + ' left the chat..</em>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(process.env.PORT || 
    3000, function() {
    console.log('listening on *:3000');
});