import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { Route, Routes } from "react-router-dom";
import ButtonComponent from "./buttons/ButtonComponent";
import SearchComponent from "./SearchComponent";

function App() {
  return ( 
  <>
    <Navbar />
    <div className="navbar-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
    <ButtonComponent />
    <SearchComponent />
    <Footer />
  </>
  );
}

export default App;
