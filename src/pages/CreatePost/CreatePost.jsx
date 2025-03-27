import styles from './CreatePost.module.css'

import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthValue} from '../../context/AuthContext';
import {useInsertDocument} from '../../hooks/useInsertDocument';
const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const {user} = useAuthValue();

  const {insertDocument, response} = useInsertDocument('posts');

  const handleSubmit = (e) => {
    
    e.preventDefault()
    setFormError('');

    try {
      new URL(image)
      
    } catch (error) {
      setFormError("A imagem precisa ser uma url")
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());


    if(!title || !image || !tags || !body) {
      setFormError('Por favor preencha todos os campos');
      return;
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    navigate('/');

  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compatilhe seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input
          type='text'
          name='title'
          required
          placeholder='Pense num bom título'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input
          type='text'
          name='image'
          required
          placeholder="Insira a imagem que mais te agrada"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          />
        </label>

        <label>
          <span>Conteúdo: </span>
          <input
          type='text'
          name='body'
          required
          placeholder="Escreva o conteúdo do post"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          />
        </label>

        <label>
          <span>Tags: </span>
          <input
          type='text'
          name='tags'
          required
          placeholder="Insira as tags separadas por virgula"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
          />
        </label>

        {!response.loading && <button className='btn'>Criar Post</button>}
        { response.loading && 
        <button className='btn' 
        disabled>Aguarde...</button>
        }
        {response.error && <p className='error'>{response.error}</p>}
      </form>
    </div>
  )
}

export default CreatePost