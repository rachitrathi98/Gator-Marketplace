import isAuth from "../helper/auth";
import Card from "../components/Card";
import NavbarPlain from "../components/NavbarPlain";
import axios from "axios"
import React, { useEffect, useState } from 'react';

const Listings = () => {

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

    return (
        <><NavbarPlain user = {isAuth() ? isAuth().name : ""} />
        <div className="home" id ="landing">
            {listings.filter(listing => listing.createdBy == isAuth().email).map(listing => (
                <Card key={listing.id} listing={listing} />
            ))}
        </div></>
    );
};

export default Listings;