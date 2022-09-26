const http = require('http');
const express = require('express');


const app = express();

/**
 * middleware /interceptor
 */
app.use((req, res, next) => {
    console.log('in middleware 1');
    next();
});
app.use((req, res, next) => {
    console.log('in middleware 2');
});


const server = http.createServer(app);
server.listen(3001);