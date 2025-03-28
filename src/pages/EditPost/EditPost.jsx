import styles from './CreatePost.module.css'

import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAuthValue} from '../../context/AuthContext'; 
import {useFetchDoc} from '../../hooks/useFetchDoc';
import {useUpdateDocument} from '../../hooks/useUpdateDocument';

const EditPost = () => {

  const {id} = useParams()
  const {document: post} = useFetchDoc("posts", id)

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(()=>{

    if(post){
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(',');

      setTags(textTags);
    }

  }, [post])

  const navigate = useNavigate();

  const {user} = useAuthValue();

  const {updateDocument, response} = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    
    e.preventDefault()
    setFormError('');

    try {
      new URL(image)
      
    } catch (error) {
        console.log(error);
      setFormError("A imagem precisa ser uma url")
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());


    if(!title || !image || !tags || !body) {
      setFormError('Por favor preencha todos os campos');
      return;
    }

    if (formError) return;

    const data = {
        title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName
    }

    updateDocument(data, id);

    navigate("/dashboard");

  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
            <h2>Editando Post: {post.title}</h2>
            <p>Altere o que desejar!</p>
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
                <p className={styles.preview_title}>Preview da imagem atual</p>
                <img className={styles.preview_image}
                src={post.image}
                alt={post.title}
                />

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

                {!response.loading && <button className='btn'>Editar Post</button>}
                { response.loading && 
                <button className='btn' 
                disabled>Aguarde...</button>
                }
                {response.error && <p className='error'>{response.error}</p>}
            </form>
        </>
      )}
    </div>
  )
}

export default EditPost