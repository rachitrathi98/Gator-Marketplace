import isAuth from "../helper/auth";
import Navbar from "../components/Navbar";
import axios from "axios"
import React, { Fragement, useEffect, useState } from 'react';
import Loading from "../helper/LoadingSign";
import {useParams} from 'react-router-dom'


const Post = ({listing}) => {
  const [dataList, setDataList] = useState([])
  const parts = window.location.href.split('/')
    useEffect(async () => {
        const resp = await axios.get("http://localhost:8000/api/get-listing/"+ parts[4], {withCredentials:true})
        setDataList(resp.data.listing)
        console.log(dataList)    
        }, []);
  let render = <Loading/>;
  
  if(dataList && dataList.title){
  render = (
    <>
    <center><img className="preview" style={{  width: 700, height: 400, margin:5 }} src={dataList.image}/></center>
        <div className="post" id ="post">
          <div class="row justify-content-center">

            <table class="table">
              <tbody>
                <tr>
                  <th>Seller Name</th>
                  <td>{dataList.createdBy}</td>
                </tr>
                <tr>
                  <th>Product</th>
                  <td>{dataList.title}</td>
                
                </tr>
                <tr>
                  <th>Product Description</th>
                  <td>{dataList.description}</td>
                
                </tr>
                <tr>
                  <th>Product Category</th>
                  <td>{dataList.tag}</td>
                  
                </tr>
                <tr>
                  <th>Seller Location</th>
                  <td>{dataList.location}</td>
                  
                </tr>
                <tr>
                  <th>Price By Seller</th>
                  <td>{dataList.price}</td>
                  
                </tr>
              </tbody>
            </table>
          </div>
          <button id = "cardButton" type="cardButton" className="cardButton">Interested</button>
        </div>
        </>
    );
  }

    return (
      <><Navbar user = {isAuth() ? isAuth().name : ""} />
        {render}
      </>        
    );
};

export default Post;