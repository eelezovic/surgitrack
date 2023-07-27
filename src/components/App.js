import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import SingleInstrumentsComponent from "../pages/SingleInstrumentsComponent";
import InstrumentSetComponent from "../pages/InstrumentSetComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />} // Pass setIsLoggedIn as a prop
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/singleinstrumentscomponent"
          element={<SingleInstrumentsComponent />}
        />
        <Route
          path="/InstrumentSetComponent"
          element={<InstrumentSetComponent />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

