const express = require('express');
const app = express();
const port = 8080;
const http = require('http').Server(app);
const socket = require('socket.io')(http);
let players = [];
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile('index.html');
})
socket.on('connection', function (s) {
    console.log('ready to use socket');
    s.on('new player', function (id,name) {
        console.log(id);
        console.log(name);
        players.push({
            name : name,
            id : id
        });
        socket.emit('players',players);
    })
    socket.emit('players',players);
})
const server = http.listen(port, function () {
    console.log('ready ' + port);
})