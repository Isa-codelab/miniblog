import styles from './Navbar.module.css';

import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue} from '../context/AuthContext';

import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const {user} = useAuthValue();
  
  return (
    <nav className= {styles.navbar}>
        <NavLink to='/' className={styles.brand}>
         Mini <span>Blog</span>
        </NavLink>

        <ul className={styles.links_list}>
            <li>
                <NavLink to='/' end className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
            </li>
            <li>
                <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : "")}>About</NavLink>
            </li>

           {!user && (
               <>
                <li>
                    <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : "")}>Login</NavLink>
                </li>
                <li>
                    <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : "")}>Registrar</NavLink>
                </li>
               </>
           )}
        </ul>
    </nav>
  )
}

export default Navbar