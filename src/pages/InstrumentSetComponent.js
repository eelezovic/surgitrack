import React, { useState } from "react";
import { InstrumentSetData, setData } from "../components/dataStorage/InstrumentSetData";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";


const InstrumentSetComponent = () => {
  const headers = ["Set Name", "ID", "Quantity", "Location"];
  const [selected, setSelected] = useState("Select specialty");
  return (
    <div className="container">

      <Dropdown selected={selected} setSelected={setSelected} />
      <Table headers={headers} data={setData} />
    </div>
  );     
}
export default InstrumentSetComponent;