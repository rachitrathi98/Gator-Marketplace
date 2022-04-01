import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { Fragment} from "react";
import isAuth from "../helper/auth"
import '@fortawesome/fontawesome-free/js/all.js';

const NewCard = ({ listing, myListings, deleteHandler}) => {
      const iStyles = { color: "white" }

  return (
      <>
    {isAuth() ? 
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBCardImage src={listing.image} position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>{listing.title}</MDBCardTitle>
        <MDBCardText>
        {listing.description}
        </MDBCardText>
        <Link className="link" to={{pathname : "/listing/" + listing.id, state:{li : true} }}>
        <MDBBtn >Read More</MDBBtn>
        </Link>
        {myListings ? (
          <>    
             <MDBBtn
                onClick={(e) => deleteHandler(e, listing.id)}
              className="float-right btn btn-danger btn-sm mx-3"
              style={{marginTop: "8px"}}
            >
              <i className="far fa-trash-alt"></i>{" "}
            </MDBBtn>
           <Link to={`/update-listing/${listing.id}`}>
              <i
                className="fa fa-pencil float-right btn btn-primary mt-2"
                style={iStyles}
              ></i>
            </Link> 
            </>
            ): null
      }
      </MDBCardBody>
    </MDBCard> :
        <MDBCard style={{ maxWidth: '22rem' }}>
        <MDBCardImage src={listing.image} position='top' alt='...' />
        <MDBCardBody>
        <MDBCardTitle>{listing.title}</MDBCardTitle>
        <MDBCardText>
        {listing.description}
        </MDBCardText>
        <MDBBtn href="http://localhost:8000/google/login">Read More</MDBBtn>
        </MDBCardBody>
    </MDBCard>
        }
    </>
  );
}

export default NewCard;