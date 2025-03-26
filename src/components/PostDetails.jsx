/* eslint-disable react/prop-types */
import style from "./PostDetails.module.css";
import { Link } from "react-router-dom";

const PostDetails = ({post}) => {
  return (
    <div className={style.post_detail}>
        <img
        src={post.image}
        alt={post.title}
        />
        <h2>{post.title}</h2>
        <p className={style.createdby}>{post.createdBy}</p>

        <div className={style.tags}>
            {
                post.tagsArray.map((tag)=> (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                ))
            }
        </div>

        <Link to={`/posts/${post.id}`} className="btn">Ler</Link>
        
    </div>
  )
}

export default PostDetails