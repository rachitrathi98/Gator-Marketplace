import { useEffect, useState } from "react";
import {posts} from "../data"
import Card from "../components/Card"
import axios from "axios"


const Home = () => {
    useEffect(() => {
      async function fetchData()
      {
        const response = await axios.get("http://localhost:5000/api/login-success", {withCredentials : true})
        console.log(response)
      }
      fetchData()
      }, []);



    return (
      <div className="home">
      {posts.map(post=>(
          <Card key={post.id} post={post}/>
      ))}
    </div>
    )
}

export default Home