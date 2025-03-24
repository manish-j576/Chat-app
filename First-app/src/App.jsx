import Signin from "./component/Signin";
import Signup from "./component/Signup";
import ChatRoom from "./component/ChatRoom";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css"
import JoinRoom from "./component/JoinRoom";
import CreateRoom from "./component/CreateRoom";
import Landing from "./component/Landing";
import { WebSocketProvider } from "./component/WebSocketContext";
function App() {
  return <>
  <WebSocketProvider>
  <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/chatRoom" element={<ChatRoom></ChatRoom>}></Route>
        <Route path="/joinRoom" element={<JoinRoom></JoinRoom>}></Route>
        <Route path="/createRoom" element={<CreateRoom></CreateRoom>}></Route>
        <Route path="/landing" element={<Landing></Landing>}></Route>
        
      </Routes>
  </Router>
  </WebSocketProvider>
    </>
  
}

export default App
