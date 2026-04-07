import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingCoins as getTrendingCoinsApi } from '../config/Api';
import { cryptoState } from '../context/Tokencontext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';

const Carousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = cryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(getTrendingCoinsApi(currency));
      setTrendingCoins(data);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trendingCoins.map((coin) => {
    const isUp = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        key={coin.id}
        to={`/coins/${coin.id}`}
        style={{ textDecoration: 'none' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 4px',
            gap: 6,
            cursor: 'pointer',
            transition: 'transform 0.25s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {/* Circular coin image */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            border: `2px solid ${isUp ? 'rgba(22,199,132,0.4)' : 'rgba(234,57,67,0.4)'}`,
            boxShadow: `0 0 12px ${isUp ? 'rgba(22,199,132,0.15)' : 'rgba(234,57,67,0.15)'}`,
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)',
          }}>
            <img src={coin.image} alt={coin.name} style={{ width: 52, height: 52, borderRadius: '50%' }} />
          </div>
          {/* Symbol */}
          <span style={{ color: '#e0e0e0', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.04em' }}>
            {coin.symbol.toUpperCase()}
          </span>
          {/* 24h change badge */}
          <span style={{
            fontSize: '0.72rem', fontWeight: 700,
            color: isUp ? '#16c784' : '#ea3943',
          }}>
            {isUp ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(1)}%
          </span>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    480: { items: 3 },
    768: { items: 5 },
    1024: { items: 7 },
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', padding: '12px 0' }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            width: 90, height: 110, borderRadius: 14,
            background: 'linear-gradient(90deg, #1a1c24 25%, #22242e 50%, #1a1c24 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: '0 8px' }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={2500}
        animationDuration={800}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
