// webserver.js
//load module http
const http = require('http');
//add express middleware
const app = require('./serverside/app');

//create a new instance of http.Server 
const server = http.createServer(app);
server.listen(process.env.PORT || 8000);
console.log('Server running on port 8000.');
