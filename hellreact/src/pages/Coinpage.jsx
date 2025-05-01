import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { cryptoState } from "../context/Tokencontext";
import { makeStyles } from "@mui/styles"; // ✅ You forgot this import earlier
import { CircularProgress } from "@mui/material"; // ✅ Also necessary

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    color: "white",
  },
  image: {
    height: 200,
    marginBottom: "1rem",
  },
  description: {
    textAlign: "center",
    maxWidth: 600,
    marginTop: "1rem",
    fontSize: 18,
  },
  infoBox: {
    backgroundColor: "#1e1e1e",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    marginTop: "1.5rem",
    textAlign: "center",
    width: "100%",
    maxWidth: "600px",
  },
  infoText: {
    margin: "0.5rem 0",
    fontSize: "1.2rem",
  },
}));

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = cryptoState();
  const classes = useStyles();

  const fetchCoinData = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchCoinData();
    }
  }, [currency, id]);

  if (loading) {
    return (
      <div className={classes.container}>
        <CircularProgress style={{ color: "gold" }} />
        <p>Loading coin data...</p>
      </div>
    );
  }

  if (!coin) return null;

  return (
    <div className={classes.container}>
      {coin.image?.large && (
        <img src={coin.image.large} alt={coin.name} className={classes.image} />
      )}
      <h1>{coin.name}</h1>
      <p
        className={classes.description}
        dangerouslySetInnerHTML={{
          __html: coin.description?.en?.split(". ")[0] + ".",
        }}
      />
      <div className={classes.infoBox}>
        <h3 className={classes.infoText}>
          Current Price: {symbol}
          {coin.market_data?.current_price?.[currency.toLowerCase()]?.toLocaleString()}
        </h3>
        <h3 className={classes.infoText}>
          Market Cap: {symbol}
          {coin.market_data?.market_cap?.[currency.toLowerCase()]?.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default Coinpage;
