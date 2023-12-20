import React, { useEffect, useState } from "react";
import styles from "../pages/SetsPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InstrumentSearchModal from "../components/InstrumentSearchModal";

function SetsPage({ user }) {
  const { id } = useParams();

  const [instrumentSearchModal, setInstrumentSearchModal] = useState(false);
  const [instruments, setInstruments] = useState([]);


  const apiBaseUrl = import.meta.env.VITE_APP_API;

  const openSearchInstrumentModal = () => {
    setInstrumentSearchModal(true);
  };

  const handleSearchInstrumentSelect = async (instrument) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/instrumentSets/${id}/attachExistingInstrument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instrumentId: instrument.id,
          }),
        }
      );

      if (response.ok) {
        setInstruments([...instruments, instrument]);

        // Fetching the updated list of instruments in the set
        fetchInstruments();

        setInstrumentSearchModal(false);
      } else {
        const data = await response.json();
        console.error(
          "Error attaching existing instrument to set:",
          data.error
        );
      }
    } catch (error) {
      console.error("Error attaching existing instrument to set:", error);
    }
  };

  // fetching instruments related to the set
  useEffect(() => {
    console.log(id);
    fetch(`${apiBaseUrl}/instrumentSets/${id}/instruments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch instruments.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setInstruments(data);
      })
      .catch((error) => {
        console.error("Error fetching instruments:", error);
      });
  }, [id]);

  //Function to delete an instrumenent from the Set
  const handleDeleteInstrument = async (instrumentId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this instrument from the set?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `${apiBaseUrl}/instrumentSets/${instrumentId}/deleteInstrument/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setInstruments((prevInstruments) =>
            prevInstruments.filter(
              (instrument) => instrument.id !== instrumentId
            )
          );
          console.log("Instrument deleted from the set successfully");
        } else {
          console.error(
            "Error deleting instrument from the set:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error deleting instrument from the set:", error);
      }
    }
  };

  return (
    <div className={styles.setWrapper}>
      <div className={styles.tableContainer}>
        <div className={styles.header}>Instrument List</div>
        <table className={styles.instrumentsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th> ID</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((instrument) => (
              <tr key={instrument.id} className={styles.instrumentItem}>
                <td>{instrument.instrument_name}</td>
                <td>{instrument.instrument_id}</td>
                <td>{instrument.instrument_quantity}</td>
                <td>{instrument.instrument_location}</td>
                <td>
                  <button
                    className={styles.deleteInstrumentBtn}
                    onClick={() => handleDeleteInstrument(instrument.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {user?.role === "ADMIN" && (
          <div className={styles.buttonContainer}>
            <button
              className={styles.addButton}
              onClick={openSearchInstrumentModal}
            >
              Add Instrument
            </button>
          </div>
        )}
        {instrumentSearchModal && (
          <InstrumentSearchModal
            closeModal={() => {
              setInstrumentSearchModal(false);
            }}
            onInstrumentSelect={handleSearchInstrumentSelect}
          />
        )}
      </div>
    </div>
  );
}

export default SetsPage;
