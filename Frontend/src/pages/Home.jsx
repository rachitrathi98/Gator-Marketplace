import { Fragment, useEffect, useState } from "react";
import {posts} from "../data"
import Card from "../components/Card"
import axios from "axios"
import Navbar from "../components/Navbar";


const Home = () => {
  const[user, setUser]  = useState({})  

    useEffect(() => {
      async function fetchData()
      {
        const response = await axios.get("http://localhost:8000/api/login-success", {withCredentials : true})
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        console.log(user);
          
      }
      fetchData()
      }, []);



    return (
      <div>
        <Navbar user = {user}/> 
      <div className="home">
        {posts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      </div>
    )
}

export default Home