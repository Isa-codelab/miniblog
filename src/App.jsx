import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useAuthentication } from './hooks/useAuthentication';

import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

import './App.css';

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  },[auth])

  if(loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className='App'>
        <AuthProvider value={{user}}>
          <BrowserRouter>
            <Navbar/>
              <div className='container'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                </Routes>
              </div>
            <Footer/>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
