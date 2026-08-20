import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import AboutMe from './components/About';
import TechStack from './components/Skills';
import Certifications from './components/Certification';
import Album from './components/Album';
import Footer from './components/Footer';



import Notfound from './components/Notfound';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='main'>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <AboutMe />
              <TechStack />
              <Certifications />
              <Album />
              <Footer />
            </>
          }
      />
        <Route path='*' element={<Notfound />}/>
      </Routes>

    </div>
  );
}

export default App;