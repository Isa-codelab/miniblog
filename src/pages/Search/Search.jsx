import style from './Search.module.css';
import { Link } from "react-router-dom";
import PostDetails from "../../components/PostDetails";

import {useFetchDocuments} from "../../hooks/useFetchDocument";
import {useQuery} from "../../hooks/useQuery";
const Search = () => {
    const query = useQuery();
    const search = query.get('q');

    const {documents: posts} = useFetchDocuments('posts', search);
  return (
    <div className={style.search_container}>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
              <div className={style.noposts}>
                <p>Não foram encontrados posts</p>
                <Link to='/' className="btn btn-dark">Voltar</Link>
              </div>
            )}
            {posts && posts.map((post)=>(
                <PostDetails key={post.id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default Search