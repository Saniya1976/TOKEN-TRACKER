import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Coinpage from './pages/Coinpage';
import Header from './components/Header';
import NotFound from './pages/NotFound';

const Footer = () => (
  <div style={{
    borderTop: '1px solid rgba(255,255,255,0.06)',
    background: '#0a0b0f',
    padding: '24px',
    textAlign: 'center',
  }}>
    <p style={{ color: '#555', fontSize: '0.8rem' }}>
      Data provided by{' '}
      <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer"
        style={{ color: '#f0b90b', textDecoration: 'none' }}>CoinGecko</a>
      {' '}· Built with ❤️ · Token Tracker X © {new Date().getFullYear()}
    </p>
  </div>
);

function App() {
  return (
    <div style={{ background: '#0a0b0f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coinpage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
