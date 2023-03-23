import React from "react";
import styles from "./Table.module.css";

function Table({data}) { 
  return (
    <div className="tableContainer">
    <table>
      <tbody>
        <tr>
          <th>Instrument Name</th>
          <th>Instrument Id</th>
          <th>Quantity</th>
          <th>Location</th> 
        </tr>
        {data.map((item) => (
        <tr key={item.id}>
          <td>{item.instrument_name}</td>
          <td>{item.instrument_id}</td>
          <td>{item.instrument_quantity}</td>
          <td>{item.instrument_location}</td>
        </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
export default Table;