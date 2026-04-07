import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '0 24px',
    }}>
      <div style={{
        fontSize: '6rem', fontWeight: 900,
        background: 'linear-gradient(135deg, #f0b90b, #ffd700)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        lineHeight: 1, marginBottom: 16,
      }}>404</div>
      <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: 10 }}>
        Page Not Found
      </h2>
      <p style={{ color: '#666', fontSize: '0.95rem', maxWidth: 400, marginBottom: 28, lineHeight: 1.6 }}>
        Looks like this token ran away! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '12px 28px',
          background: 'linear-gradient(135deg, #f0b90b, #d4a107)',
          border: 'none', borderRadius: 12,
          color: '#000', fontWeight: 800, fontSize: '0.95rem',
          cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: '0 4px 16px rgba(240,185,11,0.3)',
        }}
        onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
      >
        ← Back to Markets
      </button>
    </div>
  );
};

export default NotFound;
