import { useRef } from "react";
import axios from "axios"
export default function Signin(){
    const emailRef = useRef();
    const passwordRef = useRef();
    
    async function handleSubmit(e) {
          e.preventDefault(); 
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email,password)
        const response = await axios.post("http://localhost:3000/api/v1/signin", {email, password})
        console.log(response)
    }
    return (
        <div style={{backgroundColor:"grey", height:"100vh"}}>
            <h1 style={{ display: "flex",justifyContent:"center", marginBottom:"34px"}}>Signin</h1>
            <form style={{ display: "flex",alignItems:"center",gap:"20px",flexDirection:"column", width:"100%" }}>
                <input ref={emailRef} style={{padding: "10px", margin: "10px", borderRadius:"10px"}} type="email" placeholder="Email" />
                <input ref={passwordRef} style={{padding: "10px", margin: "10px", borderRadius:"10px"}} type="password" placeholder="Password" />
                <button onClick={handleSubmit} style={{padding: "10px", margin: "10px",borderRadius:"10px"}} >Signup</button>
            </form>
        </div>
    )
}
