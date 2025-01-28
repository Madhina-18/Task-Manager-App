import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Navbar from "./common/Navbar";
import Contact from "./Components/Contact";
import About from "./Components/About";
import DashBoard from "./Components/Dashboard";
import { UserProvider } from "./Context/UserContext";



function App() {

  return (
    <div className="bg-white">
      <UserProvider>
      <BrowserRouter>

        <Navbar />


        <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/dashboard" element={<DashBoard/>}></Route>

        </Routes>



      </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
