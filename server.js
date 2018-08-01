const http = require('http');
const port = process.env.port || 5000;
const app = require('./app');

const server =  http.createServer(app);


server.listen(port, function () {
    console.log('server is up and running on port 5000');
});