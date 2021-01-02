const http = require('http');
const fs = require('fs');

function req(request,response){
    fs.readFile('index1.html',function(err,data){
    response.writeHead(200,{
        'Content-Type' : 'text/html'
    });
    response.write(data);
    response.end();
    })
}

http.createServer(req).listen(8080);
console.log('Server starter');

