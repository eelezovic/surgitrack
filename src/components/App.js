import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { Route, Routes } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import SingleInstrumentsComponent from "../pages/SingleInstrumentsComponent";
import InstrumentSetComponent from "../pages/InstrumentSetComponent";


function App() {
  return ( 
  <> 
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    <ButtonComponent />
    <Routes>
      <Route path="/singleinstrumentscomponent" element={<SingleInstrumentsComponent />} />
      <Route path="/InstrumentSetComponent" element={<InstrumentSetComponent />} />
    </Routes>
    <Footer />
  </>
  );
}

export default App;
