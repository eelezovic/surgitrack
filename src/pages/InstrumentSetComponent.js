import React, { useState } from "react";
import Dropdown from "../components/Dropdown";



const InstrumentSetComponent = () => {
  const [selected, setSelected] = useState("Select specialty");
  return (
    <div className="container">

      <Dropdown selected={selected} setSelected={setSelected} />

    </div>
  );     
}
export default InstrumentSetComponent;