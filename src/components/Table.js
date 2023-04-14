import React, { useState } from "react";
import styles from "./Table.module.css";
import Modal from "./Modal";

function Table({ data, headers, selectedSpecialty }) {
  const [selectedItem, setSelectedItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleImageClick = () => {

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredData = selectedSpecialty !== "Select specialty"
    ? data.filter((item) => item.select_specialty === selectedSpecialty) 
    : data;

  return (
    <>
      <div className={styles.tableContainer}>
        <table>
          <tbody>
            <tr>
              {headers.map((header) => (
                <th key={header.name}>{header.name}</th>
              ))}
            </tr>
            {filteredData.map((item) => (
              <tr key={item.id} onClick={() => handleItemClick(item)}>
                {headers.map((header) => (
                  <td key={header.accessor}>{item[header.accessor]}</td>
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
          title={selectedItem.instrument_name || selectedItem.set_name}
          content={
            <>
              <img
                src={selectedItem.instrument_image}
                alt={selectedItem.instrument_name}
                onClick={handleImageClick}
              />
              <p className={styles.paragraph}> Instrument ID: {selectedItem.instrument_id}</p>
              <p className={styles.paragraph}> Quantity: {selectedItem.instrument_quantity}</p>
              <p className={styles.paragraph}>Location: {selectedItem.set_location}</p>
              <p className={styles.paragraph}> Contents: {Object.entries(selectedItem.set_contents || {}).map(([name, quantity]) => (
                  <li key={name}>{`${name} (${quantity})`}</li>
                ))} </p>
            </>
          }
        />
        
      )}
    </>
  );
}

export default Table;