const http = require('http');
const url = require('url');

function req(request, response) {
    const base = url.parse(request.url);
    const pathname = base.pathname;
    console.log(pathname + ' received');
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.write('Welcome');
    response.end();
}
http.createServer(req).listen(8080);
console.log('Server starter');