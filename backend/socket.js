import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function(socket) {
    socket.send("hello form the server")
    socket.on('message' , (e)=>{
        console.log(e.toString())
    } )
});

console.log("WebSocket server is running on ws://localhost:8080");
