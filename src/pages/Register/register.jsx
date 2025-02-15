import styles from './register.module.css';
import { useState, useEffect } from 'react';

const Register = () => {

  const [name, setDisplayName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');	
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = {
      name,
      email,
      password
    }

    if(password !== confirmPassword) {  
      setError('As senhas devem ser iguais');
      return;
    }

  }

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas historias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" 
          name='displayName'
          required
          placeholder='nome do usuário' 
          value={name}
          onChange={(e) => setDisplayName(e.target.value)}
          ></input>
        </label>

        <label>
        <span>Email:</span>
          <input 
          type="email" 
          name='email'
          required
          placeholder='digite seu email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
        <span>Senha:</span>
          <input 
          type="password" 
          name='password'
          required
          placeholder='digite sua senha' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
        <span>Confirme sua senha:</span>
          <input 
          type="password" 
          name='confirmPassword'
          required
          placeholder='confirme sua senha' 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className='btn'>Cadastrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register