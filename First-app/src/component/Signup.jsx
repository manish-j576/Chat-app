import { useRef } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function Signup(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()
    async function handleSubmit(e) {
          e.preventDefault(); 
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email,password)
        const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {email, password})
        alert(response.data.message)
        if(response.data.isSuccess === true){
                return navigate('/signin')
        }
        
    }
    return (
        <div  style={{backgroundColor:"grey", height:"100vh"}} >
            <h1 style={{ display: "flex",justifyContent:"center", marginBottom:"34px"}}>Signup</h1>
            <form  style={{ display: "flex",alignItems:"center",gap:"20px",flexDirection:"column", width:"100%" }}>
                <input ref={emailRef} style={{padding: "10px", margin: "10px", borderRadius:"10px"}} type="email" placeholder="Email" />
                <input ref={passwordRef} style={{padding: "10px", margin: "10px",borderRadius:"10px"}} type="password" placeholder="Password" />
                <button onClick={handleSubmit} style={{padding: "10px", margin: "10px" ,borderRadius:"10px"}} >Signup</button>
            </form>
        </div>
    )
}
