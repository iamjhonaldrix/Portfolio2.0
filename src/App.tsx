import { Routes, Route } from 'react-router-dom';

import InteractiveBackground from './components/InteractiveBackground';
import AnimatedSection from './components/AnimatedSection'; // 1. Import wrapper
import Navbar from './components/Navbar';
import AboutMe from './components/About';
import TechStack from './components/Skills';
import Certifications from './components/Certification';
import Album from './components/Album';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

import Notfound from './components/Notfound';
import './App.css';

function App() {
  return (
    <div className='main'>
      <InteractiveBackground />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />

              {/* Instant entrance for top section */}
              <AnimatedSection delay={0}>
                <AboutMe />
              </AnimatedSection>

              {/* 200ms delay when scrolling to skills */}
              <AnimatedSection delay={200}>
                <TechStack />
              </AnimatedSection>

              {/* 200ms delay for certifications */}
              <AnimatedSection delay={200}>
                <Certifications />
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Album />
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Contacts />
              </AnimatedSection>

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