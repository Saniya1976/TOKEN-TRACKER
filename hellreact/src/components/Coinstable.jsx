import React, { useState, useEffect, useCallback } from 'react';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { cryptoState } from '../context/Tokencontext';
import axios from 'axios';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/Api';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const Coinstable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('market_cap_rank');
  const [sortDir, setSortDir] = useState('asc');
  const { currency, symbol } = cryptoState();
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    fetchCoins();
    setPage(1);
  }, [fetchCoins]);

  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey] ?? 0;
    const bVal = b[sortKey] ?? 0;
    return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortIcon = ({ k }) =>
    sortKey === k ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ⇅';

  const formatNum = (n) => {
    if (!n) return '—';
    if (n >= 1e12) return `${symbol}${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `${symbol}${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `${symbol}${(n / 1e6).toFixed(2)}M`;
    return `${symbol}${n.toLocaleString()}`;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ background: '#0a0b0f', minHeight: '100vh', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Section heading */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: 8,
            }}>
              Cryptocurrency Prices by Market Cap
            </h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Top 100 coins ranked by market capitalization
            </p>
          </div>

          {/* Search + Refresh */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '1rem' }}>🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search coins by name or symbol..."
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(240,185,11,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <button
              onClick={fetchCoins}
              style={{
                padding: '12px 20px',
                background: 'rgba(240,185,11,0.1)',
                border: '1px solid rgba(240,185,11,0.3)',
                borderRadius: 12,
                color: '#f0b90b',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(240,185,11,0.2)'; e.target.style.borderColor = '#f0b90b'; }}
              onMouseLeave={e => { e.target.style.background = 'rgba(240,185,11,0.1)'; e.target.style.borderColor = 'rgba(240,185,11,0.3)'; }}
            >
              🔄 Refresh
            </button>
          </div>

          {/* Loading bar */}
          {loading && <LinearProgress sx={{ borderRadius: 2, mb: 2, '& .MuiLinearProgress-bar': { background: '#f0b90b' } }} />}

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 2fr 1.2fr 1.2fr 1fr 1.2fr',
            padding: '10px 20px',
            color: '#666',
            fontSize: '0.78rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 8,
          }}>
            <span>#</span>
            <span>Coin</span>
            <span style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }} onClick={() => handleSort('current_price')}>
              Price<SortIcon k="current_price" />
            </span>
            <span style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }} onClick={() => handleSort('price_change_percentage_24h')}>
              24h %<SortIcon k="price_change_percentage_24h" />
            </span>
            <span style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }} onClick={() => handleSort('total_volume')}>
              Volume<SortIcon k="total_volume" />
            </span>
            <span style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }} onClick={() => handleSort('market_cap')}>
              Market Cap<SortIcon k="market_cap" />
            </span>
          </div>

          {/* Coin rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {paginated.length === 0 && !loading ? (
              <div style={{ textAlign: 'center', color: '#555', padding: '60px 0', fontSize: '1rem' }}>
                No coins found for "{search}"
              </div>
            ) : (
              paginated.map((coin, idx) => {
                const isUp = coin.price_change_percentage_24h >= 0;
                const changeColor = isUp ? '#16c784' : '#ea3943';
                const changeBg = isUp ? 'rgba(22,199,132,0.1)' : 'rgba(234,57,67,0.1)';
                const rank = (page - 1) * itemsPerPage + idx + 1;

                return (
                  <div
                    key={coin.id}
                    onClick={() => navigate(`/coins/${coin.id}`)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '50px 2fr 1.2fr 1.2fr 1fr 1.2fr',
                      padding: '14px 20px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 12,
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(240,185,11,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(240,185,11,0.2)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {/* Rank */}
                    <span style={{ color: '#555', fontWeight: 600, fontSize: '0.85rem' }}>{rank}</span>

                    {/* Coin info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={coin.image} alt={coin.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{coin.name}</div>
                        <div style={{ color: '#666', fontSize: '0.78rem', textTransform: 'uppercase' }}>{coin.symbol}</div>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                      {symbol}{coin.current_price.toLocaleString()}
                    </div>

                    {/* 24h change */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        color: changeColor,
                        background: changeBg,
                        padding: '4px 10px',
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                      }}>
                        {isUp ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>

                    {/* Volume */}
                    <div style={{ textAlign: 'right', color: '#aaa', fontSize: '0.85rem' }}>
                      {formatNum(coin.total_volume)}
                    </div>

                    {/* Market Cap */}
                    <div style={{ textAlign: 'right', color: '#ddd', fontSize: '0.85rem', fontWeight: 600 }}>
                      {formatNum(coin.market_cap)}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: '8px 16px', borderRadius: 8,
                  background: page === 1 ? 'rgba(255,255,255,0.03)' : 'rgba(240,185,11,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: page === 1 ? '#444' : '#f0b90b',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 600, fontSize: '0.85rem',
                }}>← Prev</button>

              {[...Array(Math.min(totalPages, 10))].map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: page === p ? '#f0b90b' : 'rgba(255,255,255,0.04)',
                      border: '1px solid',
                      borderColor: page === p ? '#f0b90b' : 'rgba(255,255,255,0.08)',
                      color: page === p ? '#000' : '#aaa',
                      cursor: 'pointer',
                      fontWeight: page === p ? 800 : 500,
                      fontSize: '0.85rem',
                      transition: 'all 0.2s',
                    }}
                  >{p}</button>
                );
              })}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: '8px 16px', borderRadius: 8,
                  background: page === totalPages ? 'rgba(255,255,255,0.03)' : 'rgba(240,185,11,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: page === totalPages ? '#444' : '#f0b90b',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: 600, fontSize: '0.85rem',
                }}>Next →</button>
            </div>
          )}

          {/* Results info */}
          <p style={{ textAlign: 'center', color: '#444', fontSize: '0.8rem', marginTop: 16 }}>
            Showing {paginated.length} of {filtered.length} coins
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Coinstable;
