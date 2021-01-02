const express = require('express');
const app = express();
const port = 8080;
const http = require('http').Server(app);
const socket = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile('index.html');
})
socket.on('connection', function (s) {
    console.log('ready to use socket');
    s.on('player', function (id) {
        console.log(id);
    })
})
const server = http.listen(port, function () {
    console.log('ready ' + port);
})