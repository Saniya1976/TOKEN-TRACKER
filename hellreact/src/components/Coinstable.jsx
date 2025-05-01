import React, { useState, useEffect } from 'react';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { cryptoState } from '../context/Tokencontext';
import axios from 'axios';
import { createTheme } from '@mui/material/styles';

const Coinstable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = cryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=70&page=1&sparkline=false`
      );
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const paginatedCoins = coins.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#121212]">
        <h1 className="text-4xl font-bold text-amber-400 my-6">Top Cryptocurrencies by Market Cap</h1>
        <input
          type="text"
          placeholder="Search for a cryptocurrency..."
          className="w-full max-w-6xl px-4 py-2 mb-6 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const query = e.target.value.toLowerCase();
            setCoins((prevCoins) =>
              prevCoins.filter((coin) =>
                coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
              )
            );
          }}
        />
        <div className="w-full max-w-6xl flex flex-col gap-4 px-4">
          {loading ? (
            <LinearProgress color="secondary" />
          ) : (
            paginatedCoins.map((coin) => (
              <div
                key={coin.id}
                className="bg-gray-800 px-4 py-4 rounded-lg shadow-lg flex items-center justify-between w-full">
                <div className="flex items-center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {coin.name}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="text-right min-w-[120px]">
                  <p className="text-white font-semibold">
                    {currency === 'INR'
                      ? `₹${coin.current_price.toLocaleString('en-IN')}`
                      : `$${coin.current_price.toLocaleString('en-US')}`}
                  </p>
                  <LinearProgress
                    variant="determinate"
                    value={Math.abs(coin.price_change_percentage_24h)}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      marginTop: 1,
                      backgroundColor:
                        coin.price_change_percentage_24h >= 0
                          ? 'limegreen'
                          : 'crimson',
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-6">
          {[...Array(7).keys()].map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                page === pageIndex + 1
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-800 text-white'
              }`}>
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Coinstable;
