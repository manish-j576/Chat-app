import { useNavigate } from "react-router-dom"
export default function Landing(){

    const navigate = useNavigate();
    return <div style={{backgroundColor:"grey", height:"100vh"}}>
        <h1 style={{ display: "flex",justifyContent:"center", marginBottom:"34px"}} >Chat App</h1>
        <div style={{ display: "flex",justifyContent:"center",gap:"20px" }}>
        <button style={{padding:"10px",borderRadius:"10px",width:"10%"}} onClick={() => navigate("/createRoom")}>Create Room</button>
        <button style={{padding:"10px",borderRadius:"10px",width:"10%"}} onClick={() => navigate("/joinRoom")}>Join Room</button>
        </div>
    </div>
}