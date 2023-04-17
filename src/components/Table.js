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

  const handleImageClick = () => {};

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredData =
    selectedSpecialty !== "Select specialty"
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
          title={
            selectedItem.set_name
              ? `${selectedItem.set_name}`
              : `${selectedItem.instrument_name}`
          }
          content={
            <>
              <img
                src={selectedItem.set_image || selectedItem.instrument_image}
                alt={selectedItem.set_name || selectedItem.instrument_name}
                onClick={handleImageClick}
              />
              {selectedItem.set_name && (
                <>
                 <p className={styles.paragraph}>
                    Set ID: {selectedItem.set_id}
                  </p>
                  <p className={styles.paragraph}>
                    Quantity: {selectedItem.set_quantity}
                  </p>
                  <p className={styles.paragraph}>
                    Location: {selectedItem.set_location}
                  </p>
                  <p className={styles.contents}>
                    Contents:{" "}
                    {Object.entries(selectedItem.set_contents || {}).map(
                      ([name, quantity]) => (
                        <li key={name}>{`${name} (${quantity})`}</li>
                      )
                    )}
                  </p>
                </>
              )}
              {selectedItem.instrument_name && (
                <>
                 <p className={styles.paragraph}>
                    Instrument ID: {selectedItem.instrument_id}
                  </p>
                  <p className={styles.paragraph}>
                    Location: {selectedItem.instrument_location}
                  </p>
                  <p className={styles.paragraph}>
                    Quantity: {selectedItem.instrument_quantity}
                  </p>
                </>
              )}
            </>
          }
        />
      )}
    </>
  );
}

export default Table;
