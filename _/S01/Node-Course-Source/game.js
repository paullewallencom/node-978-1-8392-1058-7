const express = require('express');
const app = express();
const port = 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const lodash = require('lodash');
let players = [];
let round = 0;
app.use(express.static(__dirname + '/public'));
http.listen(port, function () {
    console.log('ready');
})
io.on('connection', function (socket) {
    let userID;
    socket.on('new player', function (id, name) {
        userID = {
            name: name
            , id: id
            , round: round
            , roll: null
            , winner: false
        };
        players.push(userID);
        io.emit('players', players);
    })
    socket.on('disconnect', function (reason) {
        console.log(reason);
        players = players.filter(function (obj) {
            return obj !== userID;
        })
        io.emit('players', players);
    })
    socket.on('roll', function () {
        userID.roll = lodash.random(1, 1000);
        console.log(userID);
        nextRoundCheck();
    })
    io.emit('players', players);
})

function nextRoundCheck() {
    if (players.length > 0) {
        let ready = 0;
        let top = 0;
        let win = 0;
        players.forEach(function (player, index) {
            player.winner = false;
            if (player.roll) {
                ready++;
                if (player.roll && player.roll > top) {
                    win = index;
                    top = player.roll;
                }
            }
        })
        players[win].winner = true;
        io.emit('players', players);
        if (ready >= players.length) {
            io.emit('inplay', 'Round #' + round + ' winner is ' + players[win].name);
            round++;
            players.forEach(function (player, index) {
                player.winner = false;
                player.roll = null;
                player.round = round;
            })
        }
    }
}