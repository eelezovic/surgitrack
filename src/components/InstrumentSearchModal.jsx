import React, { useState, useEffect } from "react";
import styles from "../components/InstrumentSearchModal.module.css";
import SearchBar from "../components/SearchBar";

function InstrumentSearchModal({
  searchData,
  closeModal,
  onInstrumentSelect,
}) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  useEffect(() => {
    console.log("searchData:", searchData);
  }, [searchData]);

  const handleSearch = () => {
    if (searchData) {
      const filteredResults = searchData.filter((instrument) =>
        ["instrument_name", "instrument_id", "instrument_location"].some((key) =>
          (instrument[key] || "").toUpperCase().includes(query.toUpperCase())
        )
      );
      setSearchResults(filteredResults);
    }
  };
  

  useEffect(() => {
    handleSearch();
  }, [query]);

  const handleInstrumentClick = (instrument) => {
    setSelectedInstrument(instrument);
    closeModal();
  };

  const handleSave = () => {
    if (selectedInstrument) {
      onInstrumentSelect(selectedInstrument);
      closeModal();
    }
  };

  return (
    <div className={styles.searchModalContainer}>
      <div className={styles.searchModalWrapper}>
        <h2>Search for Instruments</h2>
        <SearchBar setQuery={setQuery} />
        <ul>
          <table>
            <thead>
              <tr>
                <th>Instrument Name</th>
                <th>Instrument ID</th>
                <th>Quantity</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((instrument) => (
                <tr key={instrument.id} onClick={() => handleInstrumentClick(instrument)}>
                  <td>{instrument.instrument_name}</td>
                  <td>{instrument.instrument_id}</td>
                  <td>{instrument.instrument_quantity}</td>
                  <td>{instrument.instrument_location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>

        <div className={styles.buttons}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.closeModalButton} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstrumentSearchModal;

