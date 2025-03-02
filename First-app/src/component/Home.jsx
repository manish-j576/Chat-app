import { useNavigate } from "react-router-dom"
export default function Home(){

    const navigate = useNavigate();
    return <div style={{backgroundColor:"grey", height:"100vh"}}>
        <h1 style={{ display: "flex",justifyContent:"center", marginBottom:"34px"}} >Home page</h1>
        <div style={{ display: "flex",justifyContent:"center",gap:"20px" }}>
        <button style={{padding:"10px",borderRadius:"10px",width:"10%"}} onClick={() => navigate("/signup")}>Signup</button>
        <button style={{padding:"10px",borderRadius:"10px",width:"10%"}} onClick={() => navigate("/signin")}>Signin</button>
        </div>
    </div>
}