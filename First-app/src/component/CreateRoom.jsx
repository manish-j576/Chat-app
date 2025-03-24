import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket, WebSocketProvider } from "./WebSocketContext";
const WS_URL=import.meta.env.VITE_WS_URL

export default function CreateRoom() {
       const navigate = useNavigate();
        const ws = useWebSocket()
        const inputRef = useRef();

      if(!ws){
        return ;
      }
      
        ws.onmessage = (ev) =>{
          const message = JSON.parse(ev.data)
           console.log(message)
           if(message.isSuccess == true && message.type === "socket_connection"){
            console.log("Connected to websocket")
            console.log(message.message)
         }
          else if(message.isSuccess == true && message.type === "room_connection"){
            navigate("/chatroom");
          }
         
        }
      function onClickHandler(){
        const roomName = (inputRef.current.value).toString()
        const message = `{
            "type":"join_room",
            "roomId":"${roomName}"
        }`
        ws.send(message)
      }



  return (
    <div style={{ backgroundColor: "grey", height: "100vh" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "34px",
        }}
      >
        Create Room
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <div style={{ marginTop:"50px", width: "50%", display: "flex", gap: "2px" }}>
            <input
              ref={inputRef}
              style={{ width: "85%", padding: "10px", borderRadius: "5px" }}
              type="text"
              placeholder="Enter Room Name"
            />
            <button
              style={{
                width: "15%",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={onClickHandler}
            >
              Create Room
            </button>
          </div>
      </div>
    </div>
  );
}
