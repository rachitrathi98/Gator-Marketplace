import { Link } from "react-router-dom";
import Search from './Search';
import Add from './Add';
import { useState } from "react";

const showListings = ()=>{
  window.location.href = "http://localhost:3000/Listings";
}
const showRequests = ()=>{
  window.location.href = "http://localhost:3000/Requests";
}
const Navbar = ({user, listing, searchListing}) => {

  const [name, setName] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
    window.open("http://localhost:8000/api/logout", "_self");
  };
const handleClick=()=>{
  if(user) localStorage.removeItem("user")
  window.location.href = "http://localhost:8000/google/login";
};

const findListings = (e) => {
  console.log("Checking for changes:", e.target.value);
  setName(e.target.value);
  checkname(e.target.value);
};

const checkname = (value) => {
  if (value.length) {
    let newValues = listing.filter((info) => {

      if (info.description.toLowerCase().includes(value.toLowerCase().trim()))
        return info;
    });
    console.log("Checking for newValues", newValues);
    searchListing(newValues);
  } else {
    console.log("Hey it came here:");
    searchListing(listing);
  }
};

  return (
    
    <div className="navbar">
    <Link className="link" to="/">
        <img
            src = "https://recsports.ufl.edu/wp-content/themes/x-child-ufsa/framework/img/Orange-UF-Monogram.jpg"
            className = "logoImage"
        />
        
        </Link>
        {user ? 
        <div className="col-10 col-lg-6 mb-3 mb-lg-0">
          <input
            className="pt-1 px-3 border-0 mb-3 mb-lg-0"
            type="text"
            placeholder={"Search"}
            onChange={findListings}
            value={name}
            style={{ width: "60%", height: "95%" }}
          />
        </div> : null}   

      {user ? (
        
        <ul className="list">
         
          <li className="listItem">{user.name}</li>
          <li className="listItem" id = "logout" onClick={logout}>
            Logout
          </li>
          <li className="listItem" id="listings" onClick={showListings}>My Listings</li>
          <li className="listItem" id="requests" onClick={showRequests}>My Requests</li>
        <Add/>
          
        </ul>
        
      ) : (
        <button
        role="button"
        id = "login"
        class="btn btn-danger btn-floating"
        onClick={handleClick}
       > 
          Login
        </button>
      )}
      
    </div>
  );
};

export default Navbar;