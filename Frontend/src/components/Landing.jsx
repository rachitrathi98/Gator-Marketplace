import isAuth from "../helper/auth";
import Card from "./Card";
import Navbar from "./Navbar";
import axios from "axios"
import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import Loading from "../helper/LoadingSign";
import "../style/loading.scss";
import NewCard from "./NewCard";

const Landing = () => {

    const[listings, setListings] = useState([{}])
    const [filter_listings, setFilterListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listingsPerPage, setListingsPerPage] = useState(2);

    useEffect(async () => {

        localStorage.removeItem("user");
        const resp = await axios.get("http://localhost:8000/api/get-listings-landing")
         if(resp.data && resp.data.listings)
         {
            let lists = []
            resp.data.listings.map((listing) => lists.push(listing))
            setListings(resp.data.listings)
            setFilterListings(resp.data.listings)
            console.log(listings)
         }
        }, []);

const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filter_listings.slice(
    indexOfFirstListing,
    indexOfLastListing,
  );

  const paginate = ({ selected: selectedPage }) =>
    setCurrentPage(selectedPage + 1);
  const pageCount = Math.ceil(filter_listings.length / listingsPerPage);

  let render = <Loading/>;

  if(listings && listings.length > 1)
  {
    render = (
        <Fragment>
        <div className="home" id ="landing">
        {currentListings.length>0?
            currentListings.map(listing => (
                <NewCard key={listing.id} listing={listing} />
            ))
            :<div></div>
            }
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
        </Fragment>
    );
  }
  return (
  
    <>
    <Navbar user = {isAuth() ? isAuth().name : ""} />
    {render}
    </>
  )

};

export default Landing;
