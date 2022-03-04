import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import isAuth from "../helper/auth"
import axios from "axios"


const Card = ({ listing }) => {

  return (
    <div className="card">
    {isAuth()?
      <Link className="link" to={`/listing/${listing.id}`}>
        <span className="title">{listing.title}</span>
        <img src={listing.image} alt="" className="img" />
        <p className="desc">{listing.description}</p>
        <button type="cardButton" className="cardButton">Read More</button>
      </Link>:
      <a href = "http://localhost:8000/google/login">
      <span className="title">{listing.title}</span>
        <img src={listing.image} alt="" className="img" />
        <p className="desc">{listing.description}</p>
        <button type="cardButton" className="cardButton">Read More</button>
        </a>
}
    </div>
    
  );
};

export default Card;