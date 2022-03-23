import { Link, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import isAuth from "../helper/auth"
import axios from "axios"


const Card = ({ listing }) => {
  console.log(listing)
  return (
    <div className="card">
    {isAuth()?
      <Link className="link" to={{pathname : "/listing/" + listing.id, state:{li : true} }}>
        <span className="title">{listing.title}</span>
        <img src={listing.image} alt="" className="img" />
        <p className="desc">{listing.description}</p>
        <button type="cardButton" className="cardButton">Read More</button>
      </Link>:
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