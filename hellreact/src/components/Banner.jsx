import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from './Carousel';
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url("https://t4.ftcdn.net/jpg/04/51/96/93/360_F_451969390_fwd7fUNbLuQ0125iqpsV98d1u6Jy7GTY.jpg")', // Replace with your high-res image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#000000',
    minHeight: '320px', // Ensure it has a minimum height for visual consistency
    width: '100%',
  },
  bannerContent: {
    height: '100%', // Ensure it takes up the full height of the banner
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 25,
    textAlign: 'center',
    color: 'white',
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900' }} className='text-white'>
          Token Tracker X
        </h1>
        <div className='h-4'></div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
