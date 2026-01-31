import { Route, Routes, useLocation } from "react-router-dom"
import "./style.css"
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"
import HomePage from "./pages/Home/HomePage"
import AllFeatures from "./pages/Feature/AllFeatures"
import SignUp from "./pages/User/SignUp"
import Login from "./pages/User/Login"
import About from "./pages/About/About"
import Footer from "./components/Footer"
import Chat from "./pages/chat/Chat"
import Demo from "./pages/Demo/Demo"

function App() {
  const location = useLocation()
  const isChatPage = location.pathname === "/chat"

  return (
    <>
    <ScrollToTop />
    {!isChatPage && <Navbar/>}

    <Routes>

      <Route path ="/" element={<HomePage/>}></Route>
      <Route path ="/features" element={<AllFeatures/>}></Route>
      <Route path ="/signup" element={<SignUp/>}></Route>
      <Route path ="/login" element={<Login/>}></Route>
      <Route path ="/about" element={<About/>}></Route>
      <Route path ="/chat" element={<Chat/>}></Route>
      <Route path ="/demo" element={<Demo/>}></Route>
    
    </Routes>
    {!isChatPage && <Footer/>}
    </>
  )
}

export default App
