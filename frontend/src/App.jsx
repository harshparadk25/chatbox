import Login from "./login/Login.jsx"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route ,Routes } from "react-router-dom";
import SignUp from "./signup/SignUp.jsx";
import Home from "./home/Home.jsx";
import { VerifyUser } from "./utils/VerifyUser.jsx";
import Profile from "./profilepage/Profile.jsx";

function App() {
  
  return (
    <>
    <div className="p-2 w-screen h-screen flex items-center justify-center">
      
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route element={<VerifyUser/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer/>
    </div>

    </>
  )
}

export default App