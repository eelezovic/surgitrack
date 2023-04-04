import React, { useState } from "react";
import styles from "./Table.module.css";
import Modal from "./Modal";

function Table({ data, headers }) {
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
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
            {data.map((item) => (
              <tr key={item.id} onClick={() => handleItemClick(item)}>
                {headers.map((header) => (
                  <td key={header}>{item[header]}</td>
                ))}
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