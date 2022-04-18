import { Fragment, useEffect, useState } from "react";
import Card from "./Card"
import axios from "axios"
import Navbar from "./Navbar";
import ReactPaginate from "react-paginate";
import Loading from "../helper/LoadingSign";
import React from "react";
import isAuth from "../helper/auth";
import NewCard from "./NewCard";

const SoldItems = () => {
  const[listings, setListings] = useState([{}])
  const [filter_listings, setFilterListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage, setListingsPerPage] = useState(3);

    useEffect(async () => {
        const resp = await axios.get("http://localhost:8000/api/get-sold-listing", {withCredentials : true})
        if(resp.data && resp.data.soldListings)
        {
           let lists = []
           resp.data.soldListings.map((listing) => lists.push(listing))
           setListings(resp.data.soldListings)
           setFilterListings(resp.data.soldListings)
        }

      }, []);

  const searchListing = (newList) => {
    setFilterListings(newList);
  };

  const filterLocation = (value) => {
    let listings_temp = listings.filter((listing) => listing.location===value)
    setFilterListings(listings_temp) 
  };

  const filterTag = (value) => {
      let listings_temp = listings.filter((listing) => listing.tag===value)
      setFilterListings(listings_temp)
  };

  const lvalues = filter_listings.filter((listing) => listing.createdBy == isAuth().email)
  
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = lvalues.slice(
    indexOfFirstListing,
    indexOfLastListing,
  );

  const paginate = ({ selected: selectedPage }) =>
    setCurrentPage(selectedPage + 1);
  const pageCount = Math.ceil(lvalues.length / listingsPerPage);
  let render = <Loading/>;

  if(listings && listings.length > 1)
  {
    render = (
        <Fragment>
        <div className="home" id ="landing">
        {currentListings.length>0?
            currentListings.map(listing => (
                <NewCard key={listing.id} listing={listing} sold={true}/>
            ))
            :<div></div>
            }
        </div>
        <div className="center">
          <ReactPaginate
            id= "pagination"
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
        </Fragment>
    );
  }

    return (
      <div>
        <Navbar 
        user = {isAuth() ? isAuth().name : ""}
        listing = {listings} 
        searchListing = {searchListing} 
        filterLocation={filterLocation} 
        filterTag={filterTag}/> 
        {render}
      </div>
    )
}

export default SoldItems


