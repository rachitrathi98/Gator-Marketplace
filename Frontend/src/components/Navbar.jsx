import { Link } from "react-router-dom";
import Search from './Search';
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