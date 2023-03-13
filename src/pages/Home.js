import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";

function Home() {
  return (
  <div className="mainContainer">
    <div className="searchContainer">
      <label><b>Search </b></label>
      <input type="text"></input>
    </div>
    <div className="itemContainer">
      <ButtonComponent name="Instruments"></ButtonComponent>

      <Link to="/singleinstrumentscomponent"><button>
        Go To Page 2
        </button>
      </Link>
    </div>
    <div className="itemContainer">
      <ButtonComponent name="Instrument Sets"></ButtonComponent>
      <ButtonComponent  name="Click ME" click={() => alert("Emir")}></ButtonComponent>
    </div>
  </div> 
  );
}

export default Home;