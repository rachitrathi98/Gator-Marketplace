import { Link, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import isAuth from "../helper/auth"
import axios from "axios"
import '@fortawesome/fontawesome-free/js/all.js';

const Card = ({ listing, myListings, deleteHandler}) => {
  console.log(listing)
  const iStyles = { color: "white" };
  return (
    <div className="card">
    {isAuth()?
      <Link className="link" to={{pathname : "/listing/" + listing.id, state:{li : true} }}>
        <span className="title">{listing.title}</span>
        <img src={listing.image} alt="" className="img" />
        <p className="desc">{listing.description}</p>
        <button type="cardButton" className="cardButton">Read More</button>
        {myListings ? (
          <Fragment>    
             <button
                onClick={(e) => deleteHandler(e, listing.id)}
              className="float-right btn btn-danger btn-sm mx-3"
              style={{marginTop: "8px"}}
            >
              <i className="far fa-trash-alt"></i>{" "}
            </button>
           <Link to={`/update-listing/${listing.id}`}>
              <i
                className="fa fa-pencil float-right btn btn-primary mt-2"
                style={iStyles}
              ></i>
            </Link> 
         
            </Fragment>

            ): null
      }
      </Link>
     
      :
      <a href = "http://localhost:8000/google/login">
      <span className="title">{listing.title}</span>
        <img src={listing.image} alt="" className="img" />
        <p className="desc">{listing.description}</p>
        <button id = "cardButton" type="cardButton" className="cardButton">Read More</button>
        </a>
        
        }
    </div>
    
  );
};

export default Card;