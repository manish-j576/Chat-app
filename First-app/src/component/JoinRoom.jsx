import axios from "axios"

export default function JoinRoom(){

    async function onClickHandler(){
      const token = window.localStorage.getItem("token")
      console.log(token)
      const response = axios.post('/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
    }
    return <>
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
              height: "30%"
            }}
          >
          </div>
          <h3 style={{marginBottom:"5px"}}>Enter Room Id</h3>
          <div style={{ width: "50%",display:"flex", gap:"2px"}}>
            <input style={{width:"85%",padding:"10px" , borderRadius:"5px"}} type="text" placeholder="Enter Room Id" />
            <button style={{width:"15%" , padding:"10px" , borderRadius:"5px" ,cursor:"pointer"}} onClick={onClickHandler}>Join</button>
          </div>

        </div>
      </div>
    </>
}