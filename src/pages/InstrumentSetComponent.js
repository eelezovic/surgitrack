import React, { useState } from "react";
import { InstrumentSetData, setData } from "../components/dataStorage/InstrumentSetData";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";


const InstrumentSetComponent = () => {
  const headers = [{name: 'Set Name', accessor: 'instrument_name'},{name: 'ID', accessor: 'instrument_id'}, { name: 'Quantity', accessor: 'instrument_quantity'}, { name: 'Location',accessor: 'instrument_location'}];
  const [selected, setSelected] = useState("Select specialty");
  return (
    <div className="container">

      <Dropdown selected={selected} setSelected={setSelected} />
      <Table headers={headers} data={setData} />
    </div>
  );     
}
export default InstrumentSetComponent;