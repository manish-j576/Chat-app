export default function ChatRoom() {
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
            backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              marginTop: "50px",
              backgroundColor: "red",
              height: "80%",
            }}
          >
            <h1>chat room</h1>
          </div>
          <div style={{ width: "50%",backgroundColor:"blue",display:"flex" }}>
            <input style={{width:"85%",padding:"10px" , borderRadius:"5px"}} type="text" placeholder="Send Message ..." />
            <button style={{width:"15%" , padding:"10px" , borderRadius:"5px"}}>Send</button>
          </div>

        </div>
      </div>
    </>
  );
}
