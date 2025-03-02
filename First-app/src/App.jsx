import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css"
function App() {
  return <>
  <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
      </Routes>
  </Router>
      
    </>
  
}

export default App
