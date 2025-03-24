import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// user tupe [{roomId:"chat-room-1",ws: websocket , userId : userid}]
// messege = {
//     "type":"chat",
//     "roomId":"chat-room-1",
//     "userId":"userId"
// }
const USERS = []
wss.on('connection', function(ws) {

    console.log("user connecter 555")

    USERS.push({
        "ws":ws,
        rooms:[]
    })

    const connectionMessage = `{
        "type":"socket_connection",
        "isSuccess":true,
        "message":"Connection established successfully"
    }`

    ws.send(connectionMessage)


    ws.on('message' , (data)=>{
        const parsedData = JSON.parse(data)
        if(parsedData.type === "join_room"){
            const roomId = parsedData.roomId
            const user = USERS.find(x => x.ws === ws)
            user.rooms.push(roomId)
            const roomConnectionMessage = `{
                "type":"room_connection",
                "isSuccess":true,
                "message":"Connection established successfully"
            }`
            ws.send(roomConnectionMessage)
        }
        if(parsedData.type === "leave_room"){
            const user = USERS.find(x => x.ws === ws)
            user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
        }
        if(parsedData.type === "chat"){
            const roomId = parsedData.roomId
            const message = parsedData.message
            const roomChatMessage = `{
                "type":"chat_message",
                "isSuccess":true,
                "message": "${message}"
            }`
            USERS.forEach((user) => {
                if(user.rooms.includes(roomId))
                {
                    user.ws.send(roomChatMessage)
                }
            } )
        }
        
    } )
});

console.log("WebSocket server is running on ws://localhost:8080");
