import { useEffect, useState } from "react";
<<<<<<< HEAD
import {posts} from "../data"
import Card from "../components/Card"
=======
>>>>>>> 9c7693859b88287d19b6b1ad0d650454da3cc0fb
import axios from "axios"


const Home = () => {
<<<<<<< HEAD
    useEffect(() => {
      async function fetchData()
      {
        const response = await axios.get("http://localhost:5000/api/login-success", {withCredentials : true})
        console.log(response)
      }
      fetchData()
      }, []);

=======
    useEffect( () => {
      async function fetchData()
      {
      const response  =   await axios.get('http://localhost:5000/api/login-success', { withCredentials: true })
      console.log(response)
      }
      fetchData()
    }, []);
>>>>>>> 9c7693859b88287d19b6b1ad0d650454da3cc0fb


    return (
      <div className="home">
      {posts.map(post=>(
          <Card key={post.id} post={post}/>
      ))}
    </div>
    )
}

export default Home