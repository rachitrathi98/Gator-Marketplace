import { Fragment, useEffect, useState } from "react";
import {posts} from "../data"
import Card from "../components/Card"
import axios from "axios"
import Navbar from "../components/Navbar";


const Home = () => {
  const[user, setUser]  = useState({})  
  const[listings, setListings] = useState([{}])

    useEffect(async () => {
     
        const response = await axios.get("http://localhost:8000/api/login-success", {withCredentials : true})
        if(response && response.data)
        {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user); 
        }
          

        const resp = await axios.get("http://localhost:8000/api/get-listings", {withCredentials : true})
        if(resp.data && resp.data.listings)
        {
           let lists = []
           resp.data.listings.map((listing) => lists.push(listing))
           setListings(resp.data.listings)
           console.log(listings)
        }

      }, []);


    return (
      <div>
        <Navbar user = {user}/> 
      <div className="home">
      {listings.map(listing => (
                <Card key={listing.id} listing={listing} />
            ))}
      </div>
      </div>
    )
}

export default Home