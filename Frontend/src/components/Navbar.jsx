import { Link } from "react-router-dom";
import Add from './Add';
import { useState } from "react";
import Dropdown from 'react-select';
import '../app.css';

const showListings = ()=>{
  window.location.href = "http://localhost:3000/Listings";
}
const showSoldItems = ()=>{
  window.location.href = "http://localhost:3000/sold-items";
}
const Navbar = ({user, listing, searchListing, filterLocation, filterTag}) => {

  const [name, setName] = useState([]);
  const [dropDownOption, setdropDownOption] = useState([]);
  const [dropDownOptionTag, setdropDownOptionTag] = useState([]);
  const [filterBy, setFilterBy] = useState([]);

  const Options = [
    { label: "Location", value: 1 },
    { label: "Category", value: 2 },
  ];

  const dropDownOptions = [
    { label: "Gainesville", value: 1 },
    { label: "Ocala", value: 2 },
    { label: "Hawthorne", value: 3 },
    { label: "High Springs", value: 4 },
    { label: "Cross Creek", value: 5 },
    { label: "Melrose", value: 6 },
  ];
  

  const dropDownOptionsTag = [
    { label: "Furniture", value: 1 },
    { label: "Electronics", value: 2 },
    { label: "Stationary", value: 3 },
    { label: "Kitchen", value: 4 },
   
  ];

  const onDropSelect = (selectedItem) => {
    setdropDownOption(selectedItem);
    filterLocation(selectedItem.label)
  };

  const onDropSelectTag = (selectedItem) => {
    setdropDownOptionTag(selectedItem);
    filterTag(selectedItem.label)
  };
  
  const handleChange = (selectedItem) =>{
      setFilterBy(selectedItem.label)
  }

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333"
      };
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.open("http://localhost:8000/api/logout", "_self");
  };
const handleClick=()=>{
  if(user) localStorage.removeItem("user")
  window.location.href = "http://localhost:8000/google/login";
};

const findListings = (e) => {
  setName(e.target.value);
  checkname(e.target.value);
};

const checkname = (value) => {
  if (value.length) {
    let newValues = listing.filter((info) => {

      if (info.description.toLowerCase().includes(value.toLowerCase().trim()))
        return info;
    });
    searchListing(newValues);
  } else {
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
        <>
        <div className="col-10 col-lg-3 mb-3 mb-lg-0">
          <input
            className="pt-1 px-3 border-0 mb-3 mb-lg-0"
            type="text"
            placeholder={"Search"}
            onChange={findListings}
            value={name}
            style={{ width: "90%", height: "95%" }}
          />
        </div> 

        <Dropdown
            id = "filter"
            options={Options}
            onChange={handleChange}
            value={filterBy}
            placeholder="Filter By"
            styles={colourStyles}
          /> 

        {filterBy=="Location" ?   <Dropdown
            id = "location"
            options={dropDownOptions}
            onChange={onDropSelect}
            value={dropDownOption}
            placeholder="Filter By Location"
            styles={colourStyles}
          /> : filterBy ==="Category" ?
         <Dropdown
            id = "tags"
            value={dropDownOptionTag}
            options={dropDownOptionsTag}
            onChange={onDropSelectTag}
            placeholder="Filter By Categories"
            styles={colourStyles}
          /> :  <div></div>
        }

        </>: null}   

      {user ? (
        
        <ul className="list">
         
          <li className="listItem">{user}</li>
          <li className="listItem" id = "logout" onClick={logout}>
            Logout
          </li>
          <li className="listItem" id="listings" onClick={showListings}>My Listings</li>
          <li className="listItem" id="requests" onClick={showSoldItems}>Items Sold By You</li>
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