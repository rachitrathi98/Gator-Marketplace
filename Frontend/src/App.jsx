import "./app.css";

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./components/Landing";
import Post from "./pages/Post";
import Form from "./pages/Form";

const App = () => {

  return (
    <BrowserRouter>
          <div>

              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path = "/form" element = {<Form/>}/>
                  <Route path="/" element={<Landing />} />
                  <Route path="post/:id" element={<Post/>}/>
              </Routes>
          </div>
      </BrowserRouter>
      
  );
};

export default App;