import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SingleCoin, HistoricalChart } from '../config/Api';
import { cryptoState } from '../context/Tokencontext';
import { CircularProgress } from '@mui/material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

const TIME_BUTTONS = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
];

const CustomTooltip = ({ active, payload, label, symbol }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#161820', border: '1px solid rgba(240,185,11,0.3)',
        borderRadius: 10, padding: '10px 14px',
      }}>
        <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: 4 }}>{label}</p>
        <p style={{ color: '#f0b90b', fontWeight: 700, fontSize: '1rem' }}>
          {symbol}{Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ label, value, sub }) => (
  <div style={{
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14, padding: '16px 20px',
    flex: '1 1 160px', minWidth: 140,
  }}>
    <p style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</p>
    <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>{value}</p>
    {sub && <p style={{ color: '#555', fontSize: '0.75rem', marginTop: 4 }}>{sub}</p>}
  </div>
);

const Coinpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [days, setDays] = useState(7);
  const { currency, symbol } = cryptoState();

  const fetchCoin = useCallback(async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (err) {
      console.error('Error fetching coin:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchChart = useCallback(async () => {
    setChartLoading(true);
    try {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      const formatted = data.prices.map(([timestamp, price]) => ({
        time: new Date(timestamp).toLocaleDateString('en-IN', {
          month: 'short', day: 'numeric',
          ...(days === 1 ? { hour: '2-digit', minute: '2-digit' } : {}),
        }),
        price,
      }));
      setChartData(formatted);
    } catch (err) {
      console.error('Error fetching chart:', err);
    } finally {
      setChartLoading(false);
    }
  }, [id, days, currency]);

  useEffect(() => { fetchCoin(); }, [fetchCoin]);
  useEffect(() => { fetchChart(); }, [fetchChart]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: 16 }}>
        <CircularProgress style={{ color: '#f0b90b' }} size={48} />
        <p style={{ color: '#666' }}>Loading coin data…</p>
      </div>
    );
  }

  if (!coin) return (
    <div style={{ textAlign: 'center', color: '#666', padding: '80px 24px' }}>
      Coin not found. <span style={{ color: '#f0b90b', cursor: 'pointer' }} onClick={() => navigate('/')}>Go home →</span>
    </div>
  );

  const price = coin.market_data?.current_price?.[currency.toLowerCase()];
  const change24h = coin.market_data?.price_change_percentage_24h;
  const change7d = coin.market_data?.price_change_percentage_7d;
  const marketCap = coin.market_data?.market_cap?.[currency.toLowerCase()];
  const volume = coin.market_data?.total_volume?.[currency.toLowerCase()];
  const high24 = coin.market_data?.high_24h?.[currency.toLowerCase()];
  const low24 = coin.market_data?.low_24h?.[currency.toLowerCase()];
  const ath = coin.market_data?.ath?.[currency.toLowerCase()];
  const supply = coin.market_data?.circulating_supply;

  const isUp = change24h >= 0;
  const changeColor = isUp ? '#16c784' : '#ea3943';

  const formatLarge = (n) => {
    if (!n) return '—';
    if (n >= 1e12) return `${symbol}${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `${symbol}${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `${symbol}${(n / 1e6).toFixed(2)}M`;
    return `${symbol}${n.toLocaleString()}`;
  };

  return (
    <div style={{ background: '#0a0b0f', minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '8px 16px', color: '#aaa', cursor: 'pointer',
            fontSize: '0.85rem', marginBottom: 28, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.color = '#f0b90b'; e.target.style.borderColor = 'rgba(240,185,11,0.3)'; }}
          onMouseLeave={e => { e.target.style.color = '#aaa'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
          ← Back to Markets
        </button>

        {/* Coin header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <img src={coin.image?.large} alt={coin.name} style={{ width: 64, height: 64, borderRadius: '50%' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                {coin.name}
              </h1>
              <span style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 6, padding: '3px 10px',
                color: '#777', fontSize: '0.85rem', fontWeight: 600,
              }}>{coin.symbol?.toUpperCase()}</span>
              {coin.market_data?.market_cap_rank && (
                <span style={{
                  background: 'rgba(240,185,11,0.12)',
                  border: '1px solid rgba(240,185,11,0.25)',
                  borderRadius: 6, padding: '3px 10px',
                  color: '#f0b90b', fontSize: '0.82rem', fontWeight: 700,
                }}>
                  Rank #{coin.market_data.market_cap_rank}
                </span>
              )}
            </div>
            {/* Price and 24h change */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
                {symbol}{price?.toLocaleString()}
              </span>
              <span style={{
                color: changeColor, fontWeight: 700, fontSize: '1rem',
                background: isUp ? 'rgba(22,199,132,0.1)' : 'rgba(234,57,67,0.1)',
                padding: '5px 12px', borderRadius: 8,
              }}>
                {isUp ? '▲' : '▼'} {Math.abs(change24h).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          <StatCard label="Market Cap" value={formatLarge(marketCap)} />
          <StatCard label="24h Volume" value={formatLarge(volume)} />
          <StatCard label="24h High" value={`${symbol}${high24?.toLocaleString()}`} />
          <StatCard label="24h Low" value={`${symbol}${low24?.toLocaleString()}`} />
          <StatCard label="All-Time High" value={`${symbol}${ath?.toLocaleString()}`} />
          <StatCard label="7d Change" value={`${change7d >= 0 ? '+' : ''}${change7d?.toFixed(2)}%`} sub="Last 7 days" />
          <StatCard label="Circulating Supply" value={supply ? `${supply.toLocaleString()} ${coin.symbol?.toUpperCase()}` : '—'} />
        </div>

        {/* Chart section */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 18, padding: '24px',
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>Price Chart</h3>
            {/* Time selector */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {TIME_BUTTONS.map(({ label, days: d }) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  style={{
                    padding: '6px 14px', borderRadius: 8,
                    background: days === d ? '#f0b90b' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${days === d ? '#f0b90b' : 'rgba(255,255,255,0.1)'}`,
                    color: days === d ? '#000' : '#888',
                    cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                    transition: 'all 0.2s',
                  }}
                >{label}</button>
              ))}
            </div>
          </div>

          {chartLoading ? (
            <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress style={{ color: '#f0b90b' }} />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 10 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f0b90b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f0b90b" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="time"
                  tick={{ fill: '#555', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fill: '#555', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={v => `${symbol}${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v.toFixed(0)}`}
                  width={70}
                />
                <Tooltip content={<CustomTooltip symbol={symbol} />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#f0b90b"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#f0b90b', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Description */}
        {coin.description?.en && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: '24px',
          }}>
            <h3 style={{ color: '#f0b90b', fontWeight: 700, marginBottom: 12, fontSize: '1rem' }}>About {coin.name}</h3>
            <p
              style={{ color: '#888', lineHeight: 1.7, fontSize: '0.9rem' }}
              dangerouslySetInnerHTML={{
                __html: coin.description.en.split('. ').slice(0, 5).join('. ') + '.',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Coinpage;
