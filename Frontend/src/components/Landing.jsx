import isAuth from "../helper/auth";
import {posts} from "../data"
import Card from "./Card";
import Navbar from "./Navbar";
import axios from "axios"
import React, { useEffect, useState } from 'react';

const Landing = () => {

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
        <><Navbar user = {isAuth() ? isAuth().name : ""} />
        <div className="home" id ="landing">
            {listings.map(listing => (
                <Card key={listing.id} listing={listing} />
            ))}
        </div></>
    );
};

export default Landing;