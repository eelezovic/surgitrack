import React from "react";
import ButtonComponent from "../components/buttons/ButtonComponent";

function Home() {
  return (
  <div className="main-container">
    <div className="search-container">
      <label><b>Search </b></label>
      <input type="text"></input>
    </div>
    <div className="item-container">
      <ButtonComponent name="Instruments"></ButtonComponent>
    </div>
    <div className="item-container">
      <ButtonComponent name="Instrument Sets"></ButtonComponent>
      <ButtonComponent  name="Click ME" onClick={() => alert("Click")}></ButtonComponent>
    </div>
  </div> 
  );
}

export default Home;