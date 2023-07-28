import React from "react";
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
  return (
    <>
       <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
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
