import isAuth from "../helper/auth";
import Navbar from "../components/Navbar";
import axios from "axios"
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'


const Post = ({listing}) => {
  const [dataList, setDataList] = useState([])
  const parts = window.location.href.split('/')
    useEffect(async () => {
        const resp = await axios.get("http://localhost:8000/api/get-listing/"+ parts[4], {withCredentials:true})
        setDataList(resp.data.listing)
        console.log(dataList)    
        }, []);

    return (
        <><Navbar user = {isAuth() ? isAuth().name : ""} />
        <div className="post" id ="post">
             <span className="title">Title: {dataList.title}</span>  
             <span >Seller: {dataList.createdBy}</span>
             <span >Description: {dataList.description}</span>
             <span >Location: {dataList.location}</span>
             <span >Tag: {dataList.tag}</span>  
             <span >Price: {dataList.price}</span>  
             <div className="card-image">
              <img className="preview" style={{  width: 'auto', height: 150 }} src={dataList.image} />
            </div>

        </div></>
    );
};

export default Post;