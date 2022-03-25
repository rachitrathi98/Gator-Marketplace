import { useEffect, useState } from "react";
import Card from "../components/Card"
import axios from "axios"
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";
import React from "react";

const Home = () => {
  const[user, setUser]  = useState({})  
  const[listings, setListings] = useState([{}])
  const [filter_listings, setFilterListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage, setListingsPerPage] = useState(2);


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
           setFilterListings(resp.data.listings)
           console.log(listings)
        }

      }, []);

  const searchListing = (newList) => {
    setFilterListings(newList);
  };

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filter_listings.slice(
    indexOfFirstListing,
    indexOfLastListing,
  );

  const paginate = ({ selected: selectedPage }) =>
    setCurrentPage(selectedPage + 1);
  const pageCount = Math.ceil(filter_listings.length / listingsPerPage);
  
    return (
      <div>
        <Navbar user = {user} listing = {listings} searchListing = {searchListing} /> 
      <div className="home">
      {currentListings.map(listing => (
                <Card key={listing.id} listing={listing} />
            ))}
      </div>
      <div className="center">
          <ReactPaginate
            onPageChange={paginate}
            pageCount={pageCount}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    )
}

export default Home