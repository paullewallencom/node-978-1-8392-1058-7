const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); //for parsing JSON
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile('index.html');
})
app.post('/login', function (req, res) {
    let userName = req.body.user;
    let passWord = req.body.pass;
    console.log(userName + ' ' + passWord);
    res.json({
        status: true
    })
})
app.listen(port, function () {
    return console.log('port is ' + port);
})