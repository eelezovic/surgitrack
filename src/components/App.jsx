import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import AboutProject from "../pages/AboutProject";
import Login from "./login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import InstrumentsListPage from "../pages/InstrumentsListPage";
import InstrumentPage from "../pages/InstrumentPage";
import SetsListPage from "../pages/SetsListPage";
import SetsPage from "../pages/SetsPage";
import PrivateRoutes from "./PrivateRoutes";

const apiBaseUrl = import.meta.env.VITE_APP_API;
console.log(apiBaseUrl);

const fetchUser = () => {
  return fetch(`${apiBaseUrl}/user`).then((response) => response.json());
};

function App() {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sideBar, setSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const signout = () => {
    setUser(false);
    setSideBar(false);
  };

  const onLogin = async () => {
    const data = await fetchUser();
    if (data !== null) {
      setUser(data);
    }
    setIsUserLoading(false);
  };

  useEffect(() => {
    onLogin();
  }, []);

  if (isUserLoading) return "Loading...";

  return (
    <>
      <Navbar
        signout={signout}
        user={user}
        toggleSideBar={() => setSideBar(!sideBar)}
        closeSideBar={() => {
          setSideBar(false);
        }}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />
      <SideBar
        user={user}
        signout={signout}
        sideBar={sideBar}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        closeSideBar={() => {
          setSideBar(false);
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
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
        <Route path="/aboutproject" element={<AboutProject />} />
        <Route
          path="/instruments"
          element={<InstrumentsListPage user={user} />}
        />
        <Route
          path="/instruments/:id"
          element={
            <PrivateRoutes isSignedIn={user}>
              <InstrumentPage user={user} />
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
