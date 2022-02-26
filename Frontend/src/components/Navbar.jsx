import { Link } from "react-router-dom";
import Search from './Search';
import Add from './Add';

const showListings = ()=>{
  window.location.href = "http://localhost:3000/Listings";
}
const showRequests = ()=>{
  window.location.href = "http://localhost:3000/Requests";
}
const Navbar = ({user}) => {

  const logout = () => {
    localStorage.removeItem("user");
    window.open("http://localhost:8000/api/logout", "_self");
  };
const handleClick=()=>{
  if(user) localStorage.removeItem("user")
  window.location.href = "http://localhost:8000/google/login";
};

  return (
    
    <div className="navbar">
        <img
            src = "https://www.desktopbackground.org/download/o/2011/12/08/309191_about-university-of-florida-logo_1280x1024_h.gif"
            className = "logoImage"
        />
      <span className="logo">
        <Link className="link" to="/">
          Gator Marketplace
        </Link>
      </span>
      <Search/>
      {user ? (
        
        <ul className="list">
         
          <li className="listItem">{user.name}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
          <li className="listItem" onClick={showListings}>My Listings</li>
          <li className="listItem" onClick={showRequests}>My Requests</li>
        <Add/>
          
        </ul>
        
      ) : (
        <button
        className="btn btn-white"
        role="button"
        onClick={handleClick}
       > 
          Login
        </button>
      )}
      
    </div>
  );
};

export default Navbar;