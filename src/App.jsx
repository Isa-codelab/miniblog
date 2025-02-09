import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/About/about';

import './App.css';

function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
