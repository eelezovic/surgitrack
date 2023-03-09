import React from "react";
import ButtonComponent from "../components/buttons/ButtonComponent";

function Home() {
  return (
  <div className="main-container">
    <div className="item-container">
      <ButtonComponent name="Instruments"></ButtonComponent>
    </div>
    <div className="item-container">
      <ButtonComponent name="Instruments Sets"></ButtonComponent>
    </div>

  </div> 
  )
}

export default Home;