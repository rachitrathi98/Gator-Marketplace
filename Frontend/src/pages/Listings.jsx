import isAuth from "../helper/auth";
import Card from "../components/Card";
import NavbarPlain from "../components/NavbarPlain";
import Loading from "../helper/LoadingSign";
import axios from "axios"
import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import NewCard from "../components/NewCard";


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
    const [filter_listings, setFilterListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listingsPerPage, setListingsPerPage] = useState(2);

    useEffect(async () => {
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

    if(listings && listings.length > 1)
  {
    render = (
        <Fragment>
        <div className="home" id ="landing">
        {currentListings.map(listing => (
                <NewCard key={listing.id} listing={listing} myListings ={true} deleteHandler = {deleteHandler}/>
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
        </Fragment>

    )}

    return (

        <>
        <NavbarPlain user = {isAuth() ? isAuth().name : ""} />
        {render}
        </>
    );
};

export default Listings;