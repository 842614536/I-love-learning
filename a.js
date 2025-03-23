const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8055 });
let a = 0
wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    ws.send('Welcome New Client!');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        a++
        if (a === 10) {
            // throw 1
        }
        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', function() {
        console.log('The client has disconnected.');
    });

    ws.on('error', function(error) {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
