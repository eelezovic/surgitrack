import React, {useState} from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import SingleInstrumentsComponent from "../pages/SingleInstrumentsComponent";
import InstrumentSetComponent from "../pages/InstrumentSetComponent";
import PrivateRoutes from "./PrivateRoutes";
import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import { MdTrendingUp } from "react-icons/md";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true)
  const signin = () => {
    setIsSignedIn(true)
  }
  const signout = () => {
    setIsSignedIn(false)
  }

  return (
    <>
       <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
          <Route path="/home" element={<PrivateRoutes isSignedIn={isSignedIn}><Home /></PrivateRoutes>} />
          <Route path="/about" element={<PrivateRoutes isSignedIn={isSignedIn}><About /></PrivateRoutes>} />

       { /*<Route
          path="/singleinstrumentscomponent"
          element={<SingleInstrumentsComponent />}
        />
        <Route
          path="/InstrumentSetComponent"
          element={<InstrumentSetComponent />}
        />*/}
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
