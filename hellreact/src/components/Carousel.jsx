import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { TrendingCoins as getTrendingCoinsApi } from '../config/Api';
import { cryptoState } from '../context/Tokencontext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';

const useStyles = makeStyles(() => ({
  carousel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
  },
}));

const Carousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const classes = useStyles();
  const { currency } = cryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(getTrendingCoinsApi(currency));
      setTrendingCoins(data);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const formatPrice = (price) => {
    if (currency === 'INR') {
      return `₹${(price * 85).toLocaleString()}`; 
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  const items = trendingCoins.map((coin) => (
    <Link
      key={coin.id}
      className={classes.carouselItem}
      to={`/coins/${coin.id}`}
    >
      <img
        src={coin.image}
        alt={coin.name}
        style={{ marginBottom: 10, height: 70 }}
      />
      <span style={{ fontWeight: 'bold', color: 'goldenrod' }}>{coin.name}</span>
      <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>
        {coin.symbol}
      </span>
      <span style={{ color: 'lightgray' }}>{formatPrice(coin.current_price)}</span>
    </Link>
  ));

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
    1024: { items: 6 },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={900}
        animationDuration={1500}
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
