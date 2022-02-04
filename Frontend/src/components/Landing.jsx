import isAuth from "../helper/auth";
import {posts} from "../data"
import Card from "./Card";
import Navbar from "./Navbar";
const Landing = () => {

    return (
        <><Navbar user = {isAuth() ? isAuth().name : ""} />
        <div className="home">
            {posts.map(post => (
                <Card key={post.id} post={post} />
            ))}
        </div></>
    );
};

export default Landing;