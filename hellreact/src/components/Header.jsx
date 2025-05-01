import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { cryptoState } from '../context/Tokencontext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = cryptoState();

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: 'dark',
          background: {
            default: '#0d1117', // Darker background
            paper: '#161b22', // Slightly lighter for contrast
          },
          text: {
            primary: '#ffffff', // White text for better readability
          },
        },
      })}
    >
      <AppBar color="transparent" position="static" elevation={10}>
        <Container className="bg-[#0d1117]">
          <Toolbar className="flex justify-between">
            <p className="text-lg font-bold text-amber-400">Token Tracker X</p>

            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[hsla(43,64%,49%,1)] w-28 h-10 rounded-lg font-extrabold"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
