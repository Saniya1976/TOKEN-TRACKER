import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coinpage from "./pages/Coinpage";
import Header from "./components/Header";
import NotFound from "./pages/NotFound"; // Import the NotFound component
 

function App() {
  return (
    <>
      <div className="bg-[#14161a] text-white min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coinpage />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>

        <div className="mt-8 flex justify-center space-x-4">
        
        </div>
      </div>
    </>
  );
}

export default App;
