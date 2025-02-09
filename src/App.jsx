import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/About/about';

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
          </Routes>
        </div>
        <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
