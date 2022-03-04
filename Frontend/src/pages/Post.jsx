import { useLocation } from "react-router";
import { posts } from "../data";
import NavbarPlain from "../components/NavbarPlain"

const Post = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const post = posts.find((p) => p.id.toString() === path);

  console.log(location);
  return (
    <><NavbarPlain/>
    <div className="post">
      <img src={post.img} alt="" className="postImg" />
      <h1 className="postTitle">{post.title}</h1>
      <p className="postDesc">{post.desc}</p>
      <p className="postLongDesc">{post.longDesc}</p>
      <button className="cardInterested">Interested</button>

    </div></>
  );
};

export default Post;