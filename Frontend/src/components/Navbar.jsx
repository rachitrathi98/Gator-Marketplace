import { Link } from "react-router-dom";
const Navbar = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("user");
    window.open("http://localhost:5000/auth/logout", "_self");
  };
const handleClick=()=>{
  window.location.href = "http://localhost:5000/auth/google";
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
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.displayName}</li>
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