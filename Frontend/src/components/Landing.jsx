import {posts} from "../data"
import Card from "./Card";
const Landing = () => {

    return (
        <div className="home">
        {posts.map(post=>(
            <Card key={post.id} post={post}/>
        ))}
    </div>
    );
};

export default Landing;