import axios from "axios";

export default function JoinRoom() {
  async function onClickHandler(e) {
    e.preventDefault(); 
    const token = window.localStorage.getItem("token");
  
    console.log(token);
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
    const response = await axios.post(`${BACKEND_URL}/api/v1/joinRoom`,{}, {
      headers: {
        'Authorization': token,
      },
    });
    console.log(response)
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
