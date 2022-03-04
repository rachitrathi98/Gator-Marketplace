import { Link } from "react-router-dom";
const NavbarPlain = () =>{
  return (
    
    <div className="navbar">
    <Link className="link" to="/">
        <img
            src = "https://recsports.ufl.edu/wp-content/themes/x-child-ufsa/framework/img/Orange-UF-Monogram.jpg"
            className = "logoImage"
        />
        
        </Link>
        
     
      
      
    </div>
  );
}

export default NavbarPlain;