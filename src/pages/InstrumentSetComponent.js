import React from "react";
import styles from "./InstrumentSetComponent.module.css";

const InstrumentSetComponent = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Set Name</th>
            <th>Set ID</th>
            <th>Quantity</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((set) => (
            <tr key={set.set_id}>
              <td>{set.set_name}</td>
              <td>{set.set_id}</td>
              <td>{set.set_quantity}</td>
              <td>{set.set_location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstrumentSetComponent;