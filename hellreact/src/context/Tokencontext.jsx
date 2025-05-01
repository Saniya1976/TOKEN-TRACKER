

import React, { createContext, useContext, useState, useEffect } from "react";

const CryptoContext = createContext();


const Tokencontext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default Tokencontext;


export const cryptoState = () => useContext(CryptoContext);
