import React from "react";
import ButtonComponent from "../components/buttons/ButtonComponent";

function Home() {
  return (
  <div className="mainContainer">
    <div className="searchContainer">
      <label><b>Search </b></label>
      <input type="text"></input>
    </div>
    <div className="itemContainer">
      <ButtonComponent name="Instruments"></ButtonComponent>
    </div>
    <div className="itemContainer">
      <ButtonComponent name="Instrument Sets"></ButtonComponent>
      <ButtonComponent  name="Click ME" klik={() => alert("Emir")}></ButtonComponent>
    </div>
  </div> 
  );
}

export default Home;