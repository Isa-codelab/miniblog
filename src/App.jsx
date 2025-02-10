import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/About/about';
import Register from './pages/Register/register';
import Login from './pages/Login/login';

import './App.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <div className='App'>
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
      </div>
    </>
  )
}

export default App
