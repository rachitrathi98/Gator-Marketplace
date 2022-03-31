import isAuth from "../helper/auth";
import Card from "../components/Card";
import NavbarPlain from "../components/NavbarPlain";
import Loading from "../helper/LoadingSign";
import axios from "axios"
import React, { Fragment, useEffect, useState } from 'react';

// const Listing = ({ post }) => {
//   return (
//     <div className="card">
//       <Link className="link" to={`/post/${post.id}`}>
//         <span className="title">{post.title}</span>
//         <img src={post.img} alt="" className="img" />
//         <p className="desc">{post.desc}</p>
//         <button className="cardButton">Read More</button>
//         <button className="cardInterested">Interested</button>
//       </Link>
//     </div>
//   );
// };

const Listings = ({history}) => {

    const[listings, setListings] = useState([{}])
    useEffect(async () => {
        const resp = await axios.get("http://localhost:8000/api/get-listings-landing")
         if(resp.data && resp.data.listings)
         {
            let lists = []
            resp.data.listings.map((listing) => lists.push(listing))
            setListings(resp.data.listings)
            console.log(listings)
         }
        }, []);

    const deleteHandler = async (e, listingId) =>{

        let isConf = window.confirm("Are you sure you want to delete ?");
        if (isConf) {
            const resp = await axios.delete(`http://localhost:8000/api/delete-listing/${listingId}`, {withCredentials: true})
           if(resp.data && resp.data.res)
            {
                window.location.href="http://localhost:3000/Listings";
            }
        }
    }
    let render = <Loading/>;

    if(listings && listings.length > 1)
  {
    render = (
        <div className="home" id ="landing">
        {listings.filter(listing => listing.createdBy == isAuth().email).map(listing => (
                <Card key={listing.id} listing={listing} myListings ={true} deleteHandler = {deleteHandler}/>
            ))}            
        </div>

    )}

    return (

        <>
        <NavbarPlain user = {isAuth() ? isAuth().name : ""} />
        {render}
        </>
    );
};

export default Listings;