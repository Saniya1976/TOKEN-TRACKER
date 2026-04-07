import React from 'react';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0d0f17 0%, #0a0b0f 100%)',
      borderBottom: '1px solid rgba(240,185,11,0.1)',
      padding: '48px 0 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', top: -80, left: '20%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,185,11,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -60, right: '15%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        {/* Hero text */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(240,185,11,0.1)',
            border: '1px solid rgba(240,185,11,0.25)',
            borderRadius: 40,
            padding: '6px 18px',
            fontSize: '0.78rem',
            color: '#f0b90b',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            🔥 Live Crypto Data
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 16,
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 30%, #aaa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Track the World's</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #f0b90b, #ffd700, #f0b90b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Top Cryptocurrencies</span>
          </h1>

          <p style={{ color: '#888', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
            Real-time prices, market caps, and trends for 100+ coins — switch between INR and USD instantly.
          </p>
        </div>

        {/* Trending label */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ color: '#555', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            🚀 Trending Right Now
          </span>
        </div>

        {/* Carousel */}
        <Carousel />
      </div>
    </div>
  );
};

export default Banner;
