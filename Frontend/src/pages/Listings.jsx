import { Link } from "react-router-dom";

const Listing = ({ post }) => {
  return (
    <div className="card">
      <Link className="link" to={`/post/${post.id}`}>
        <span className="title">{post.title}</span>
        <img src={post.img} alt="" className="img" />
        <p className="desc">{post.desc}</p>
        <button className="cardButton">Read More</button>
        <button className="cardInterested">Interested</button>
      </Link>
    </div>
  );
};

export default Listing;