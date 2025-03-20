import { useEffect, useState } from "react";
import axios from "axios";

const WS_URL=import.meta.env.WS_URL

export default function CreateRoom() {


  const [roomID, setRoomId] = useState("");
  const [socket , setSocket] = useState()
  useEffect(() => {
    async function fetchData() {
      console.log("Fetch data");
      const token = window.localStorage.getItem("token");
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/createRoom`,
        {socket},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.data && response.data.roomID) {
        setRoomId(response.data.roomID);
      } else {
        console.error("roomID is missing in response");
      }
    }
    fetchData();
  }, []);

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080")
    setSocket(ws)
    ws.onmessage = (ev) =>{
        console.log(ev.data)
    }
    ws.onclose = ()=>{
      console.log("connection disconnected")
    }
    return () =>{
      ws.close()
    }
  })



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
        Room Id : {roomID}
      </div>
    </div>
  );
}
