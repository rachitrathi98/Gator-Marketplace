import Navbar from "./components/Navbar";
import "./app.css";

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";

const App = () => {

  return (
    <BrowserRouter>
          <div>
              <Navbar />
              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Landing />} />
                  
              </Routes>
          </div>
      </BrowserRouter>
      
  );
};

export default App;