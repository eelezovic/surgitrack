import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "./login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import SingleInstrumentsComponent from "../pages/SingleInstrumentsComponent";
import InstrumentSetComponent from "../pages/InstrumentSetComponent";
import PrivateRoutes from "./PrivateRoutes";
import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import { MdTrendingUp } from "react-icons/md";
import { FaLaptopHouse } from "react-icons/fa";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const signin = () => {
    setIsSignedIn(true);
  };
  const signout = () => {
    setIsSignedIn(false);
  };

  return (
    <>
    <Navbar signout={signout} />
      <Routes>
        <Route path="/" element={<Login signin={signin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoutes isSignedIn={isSignedIn}>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoutes isSignedIn={isSignedIn}>
              <About />
            </PrivateRoutes>
          }
        />
        <Route
          path="/singleinstrumentscomponent"
          element={
            <PrivateRoutes isSignedIn={isSignedIn}>
              <SingleInstrumentsComponent />
            </PrivateRoutes>
          }
        />
        <Route
          path="/InstrumentSetComponent"
          element={
            <PrivateRoutes isSignedIn={isSignedIn}>
              <InstrumentSetComponent />
            </PrivateRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
