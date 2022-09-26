const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html>');
        res.write('<body><form action="/message" method="POST"><input name="anyName" type="text"/><button type="submit">Send</button></form></body>');
        res.write('</html>');
    } else if (req.url === '/message' && req.method === 'POST'){
        const body = [];
        req.on('data', (chunkData) => {
            console.log('chunkDate', chunkData);
            body.push(chunkData);
        });
        req.on('end', (chunkData) => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsedBody', parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })
    } else {
        res.write('<html>');
        res.write('<body><h1>Hello World</h1></body>');
        res.write('</html>');
    }
});


server.listen(3001);