import { useEffect, useState } from "react";
import axios from "axios"


const Home = () => {
    useEffect( () => {
      async function fetchData()
      {
      const response  =   await axios.get('http://localhost:5000/api/login-success', { withCredentials: true })
      console.log(response)
      }
      fetchData()
    }, []);


    return (
        <div className="home">
          
        </div>
    )
}

export default Home