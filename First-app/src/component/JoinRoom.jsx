import axios from "axios";
import { useRef, useState } from "react";

export default function JoinRoom() {
  const inputRef = useRef("")
  const [roomId,setRoomId] = useState("")
  const [messages, setMessages]=useState([])
  const [socket , setSocket]=useState(null);
  const [message, setMessage]=useState("")

  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL


  async function onClickHandler(e) {
    e.preventDefault(); 

    const enteredRoomID = inputRef.current.value
    setRoomId(enteredRoomID)


    const token = window.localStorage.getItem("token");
    

    try {
      const response = await axios.post(
          `${BACKEND_URL}/api/v1/joinRoom`,
          { roomId: enteredRoomID }, 
          {
              headers: {
                  Authorization: token,
              },
          }
      );

      console.log(response.data);
  } catch (error) {
      console.error("Error joining room:", error);
  }


    

  useEffect(()=>{
    console.log("useeffect run")
    if(!roomId) return;
    const newSocket = new WebSocket(`${WS_URL}?roomId=${roomID}`)  
    setSocket(newSocket)  

    newSocket.onopen = () => {
        console.log("connect to room")
    }
    newSocket.onmessage = (event) => {
        setMessages((prev)=>[...prev,event.data])
    }
    newSocket.onclose = () =>{
        console.log("websocket closed")
    }
    return ()=>{
        newSocket.close();
    };
  },[roomId])

  const sendMessage = () =>{
    if(socket?.readyState === WebSocket.OPEN){
        socket.send("hellp")
        setMessage("")
        
    }else{
        console.warn("Ws connection is not open yet")
    }
  }
  }


  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              marginTop: "50px",
              height: "30%",
            }}
          ></div>
          <h3 style={{ marginBottom: "5px" }}>Enter Room Id</h3>
          <div style={{ width: "50%", display: "flex", gap: "2px" }}>
            <input
              ref={inputRef}
              style={{ width: "85%", padding: "10px", borderRadius: "5px" }}
              type="text"
              placeholder="Enter Room Id"
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
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
