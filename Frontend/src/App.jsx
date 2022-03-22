import "./app.css";

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./components/Landing";
import Post from "./pages/Post";
import ProductListing from "./pages/ProductListing";
import EditProductListing from "./pages/EditProductListing";

const App = () => {

  return (
    <BrowserRouter>
          <div>

              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path = "/Form" element = {<ProductListing/>}/>
                  <Route path="/" element={<Landing />} />
                  <Route path="post/:id" element={<Post/>}/>
                  <Route path = "update-listing/:id" element = {<EditProductListing/>}/>
              </Routes>
          </div>
      </BrowserRouter>
      
  );
};

export default App;