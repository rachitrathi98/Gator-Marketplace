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
    <Link className="link" to="/">
        <img
            src = "https://recsports.ufl.edu/wp-content/themes/x-child-ufsa/framework/img/Orange-UF-Monogram.jpg"
            className = "logoImage"
        />
        
        </Link>
        
      <Search/>
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