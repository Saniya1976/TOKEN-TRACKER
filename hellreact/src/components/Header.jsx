import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { cryptoState } from '../context/Tokencontext';

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = cryptoState();

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(10, 11, 15, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(240,185,11,0.15)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f0b90b, #d48c00)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 900, color: '#000',
                boxShadow: '0 0 12px rgba(240,185,11,0.4)',
              }}>₿</div>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #f0b90b, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
              }}>
                Token Tracker X
              </span>
            </div>

            {/* Nav items + Currency */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span
                onClick={() => navigate('/')}
                style={{ color: '#aaa', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#f0b90b'}
                onMouseLeave={e => e.target.style.color = '#aaa'}
              >Markets</span>

              <Select
                variant="outlined"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                size="small"
                sx={{
                  color: '#f0b90b',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(240,185,11,0.4)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f0b90b' },
                  '& .MuiSvgIcon-root': { color: '#f0b90b' },
                  minWidth: 90,
                }}
              >
                <MenuItem value="USD">🇺🇸 USD</MenuItem>
                <MenuItem value="INR">🇮🇳 INR</MenuItem>
              </Select>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
