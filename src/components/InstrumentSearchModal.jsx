import React, { useState, useRef, useEffect } from "react";
import styles from "../components/InstrumentSearchModal.module.css";
import SearchBar from "../components/SearchBar";

function InstrumentSearchModal({
  closeModal,
  onInstrumentSelect,
}) {

  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState()
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModal]);

  //Fetching Instrument data
  const fetchData = () => {
    fetch("/api/singleInstruments")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
         setSearchData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    onInstrumentSelect(instrument);
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
    <div className={styles.searchModalWrapper} ref={modalRef}>
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
            {searchResults.length === 0 ? ( 
              <tr>
                <td colSpan="4">Search for instrument in the search bar...</td>
              </tr>
            ) : (
              searchResults.slice(0, 4).map((instrument) => (
                <tr key={instrument.id} onClick={() => handleInstrumentClick(instrument)}>
                  <td>{instrument.instrument_name}</td>
                  <td>{instrument.instrument_id}</td>
                  <td>{instrument.instrument_quantity}</td>
                  <td>{instrument.instrument_location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </ul>

      <div className={styles.buttons}>
        <button className={styles.closeModalButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  </div>
  );
}

export default InstrumentSearchModal;

