import { Link } from "react-router-dom";
import isAuth from "../helper/auth"


const Card = ({ post }) => {
  return (
    <div className="card">
    {isAuth()?
      <Link className="link" to={`/post/${post.id}`}>
        <span className="title">{post.title}</span>
        <img src={post.img} alt="" className="img" />
        <p className="desc">{post.desc}</p>
        <button type="cardButton" className="cardButton">Read More</button>
      </Link>:
      <a href = "http://localhost:8000/google/login">
      <span className="title">{post.title}</span>
        <img src={post.img} alt="" className="img" />
        <p className="desc">{post.desc}</p>
        <button type="cardButton" className="cardButton">Read More</button>
        </a>
}
    </div>
    
  );
};

export default Card;