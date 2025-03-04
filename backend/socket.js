import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("New client connected...");


    ws.on('error', console.error);

    ws.on('message', function message(data) {

        ws.send(data.toString());
    });

    ws.send('Hello! Message From Server!!');
});

console.log("WebSocket server is running on ws://localhost:8080");
