import { useFetchDocuments } from '../../hooks/useFetchDocument';
import style from './home.module.css';

import {useNavigate, Link} from 'react-router-dom';

import PostDetails from '../../components/PostDetails';

const Home = () => {
  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments('posts');

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className={style.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onClick={handleSubmit} className={style.searchform}>
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