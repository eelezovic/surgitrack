import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import styles from "../pages/Home.module.css";
import About from "../pages/About";
import AboutProject from "../pages/AboutProject";

function Home() {
  return (
  <>
  <About />
  <AboutProject />
  </>
  );
}

export default Home;
