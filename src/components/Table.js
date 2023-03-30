import React, { useState } from "react";
import styles from "./Table.module.css";
import Modal from "./Modal";

function Table({ data }) {
  const [selectedItem, setSelectedItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleImageClick = () => {
    // do something when the image is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <table>
          <tbody>
            <tr>
              <th>Instrument Name</th>
              <th>Instrument Id</th>
              <th>Quantity</th>
              <th>Location</th>
              
            </tr>
            {data.map((item) => (
              <tr key={item.id} onClick={() => handleItemClick(item)}>
                <td>{item.instrument_name}</td>
                <td>{item.instrument_id}</td>
                <td>{item.instrument_quantity}</td>
                <td>{item.instrument_location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItem && (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          title={selectedItem.instrument_name}
          content={
            <>
              <img
                src={selectedItem.instrument_image}
                alt={selectedItem.instrument_name}
                onClick={handleImageClick}
              />
              <p className={styles.paragraph}>Instrument ID: {selectedItem.instrument_id}</p>
              <p className={styles.paragraph}>Quantity: {selectedItem.instrument_quantity}</p>
            </>
          }
        />
      )}
    </>
  );
}

export default Table;