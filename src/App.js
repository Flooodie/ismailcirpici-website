import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-bg">
      <Router>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ben-kimim" element={<About />} />
            <Route path="/neler-yapabilirim" element={<Skills />} />
            <Route path="/portfolyo" element={<Portfolio />} />
            <Route path="/iletisim" element={<ContactForm />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
