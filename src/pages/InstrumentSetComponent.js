import React, { useState } from "react";
import styles from "../pages/InstrumentSetComponent.module.css";
import { setData as InstrumentSetData } from "../components/dataStorage/InstrumentSetData";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";

const InstrumentSetComponent = () => {
  const headers = [
    { name: "Set Name", accessor: "set_name" },
    { name: "ID", accessor: "set_id" },
    { name: "Quantity", accessor: "set_quantity" },
    { name: "Location", accessor: "set_location" },
  ];
  const [selected, setSelected] = useState("Select specialty");
  const [query, setQuery] = useState("");


  return (
    <div className={styles.container}>
      <SearchBar setQuery={setQuery} />
      <Dropdown selected={selected} setSelected={setSelected} />
      <Table headers={headers} data={InstrumentSetData} />
    </div>
  );
};

export default InstrumentSetComponent;
