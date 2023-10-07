import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import AboutProject from "../pages/AboutProject";
import Login from "./login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import InstrumentSetComponent from "../pages/InstrumentSetComponent";
import InstrumentsListPage from "../pages/InstrumentsListPage";
import InstrumentPage from "../pages/InstrumentPage";
import SetsListPage from "../pages/SetsListPage";
import SetsPage from "../pages/SetsPage";
import PrivateRoutes from "./PrivateRoutes";


function App() {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState(null);

  const signout = () => {
    setUser(false);
  };

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setUser(data);
        }
        setIsUserLoading(false);
      })
      .catch((error) => {
        console.error("Error checking user authentication:", error);
      });
  }, []);

  if (isUserLoading) return "Loading...";

  return (
    <>
      <Navbar signout={signout} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes isSignedIn={user}>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoutes isSignedIn={user}>
              <About />
            </PrivateRoutes>
          }
        />
         <Route
          path="/aboutproject"
          element={
            <PrivateRoutes isSignedIn={user}>
              <AboutProject />
            </PrivateRoutes>
          }
        />
        <Route
          path="/instruments"
          element={
            <PrivateRoutes isSignedIn={user} >
              <InstrumentsListPage  user={user}/>
            </PrivateRoutes>
          }
        />
        <Route
          path="/instruments/:id"
          element={
            <PrivateRoutes isSignedIn={user}>
              <InstrumentPage user={user}/>
            </PrivateRoutes>
          }
        />

        <Route
          path="/sets"
          element={
            <PrivateRoutes isSignedIn={user}>
              <SetsListPage user={user} />
            </PrivateRoutes>
          }
        />
         <Route
          path="/sets/:id"
          element={
            <PrivateRoutes isSignedIn={user}>
              <SetsPage user={user} />
            </PrivateRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
