import "./app.css";

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Post from "./pages/Post";

const App = () => {

  return (
    <BrowserRouter>
          <div>

              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Landing />} />
                  <Route path="post/:id" element={<Post/>}/>
              </Routes>
          </div>
      </BrowserRouter>
      
  );
};

export default App;