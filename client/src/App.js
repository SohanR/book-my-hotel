import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./booking/Home";
import TopNav from "./components/TopNav";


function App() {
  return (
    <BrowserRouter>
    <TopNav/>
    <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
