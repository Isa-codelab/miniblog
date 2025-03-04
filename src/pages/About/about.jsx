import { Link } from "react-router-dom"
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Mini <span>Blog</span></h2>
      <p>
        Esse projeto é um mini blog que se consiste de React no front-end e Firebase no back
      </p>
      <Link className='btn' to='/'>Ir para Home</Link>
    </div>
  )
}

export default About