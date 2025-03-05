import style from './home.module.css';

import {useNavigate, Link} from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const [posts] = useState([]);

  const handleSubmit = (e) => {}
  return (
    <div className={style.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onClick={handleSubmit} className={style.searchform}>
        <input type='text' placeholder='Busque por tags' onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
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