import { useFetchDocuments } from '../../hooks/useFetchDocument';
import style from './home.module.css';

import { Link, useNavigate} from 'react-router-dom';

import { useState } from 'react';

import PostDetails from '../../components/PostDetails';

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents: posts, loading} = useFetchDocuments('posts');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query){
      return navigate(`/search?q=${query}`);
    }
  }
  return (
    <div className={style.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onClick={handleSubmit} className={style.search_form}>
        <input type='text' placeholder='Busque por tags' onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}

        {posts && posts.map((post) =>
          <PostDetails key={post.id} post={post}/>

        )}

        {posts && posts.length === 0 && (
          <div className={style.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Home