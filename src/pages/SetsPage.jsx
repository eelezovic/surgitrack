import React, { useEffect, useState } from "react";
import styles from "../pages/SetsPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InstrumentSearchModal from "../components/InstrumentSearchModal";

function SetsPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();


  const [instrumentSearchModal, setInstrumentSearchModal] = useState(false);
  const [instruments, setInstruments] = useState([]);
  const [newInstrumentData, setNewInstrumentData] = useState({
    instrumentName: "",
    instrumentId: "",
    instrumentQuantity: "",
    instrumentLocation: "",
  });

  const openSearchInstrumentModal = () => {
    setInstrumentSearchModal(true);
  };

  const handleSearchInstrumentSelect = async (instrument) => {
    try {
      const instrumentData = {
        instrumentName: instrument.instrument_name,
        instrumentId: instrument.instrument_id,
        instrumentQuantity: instrument.instrument_quantity,
        instrumentLocation: instrument.instrument_location,
      };
  
      const response = await fetch(`/api/instrumentSets/${id}/addNewInstrument`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instrumentData),
      });
  
      if (response.ok) {

        setInstruments([...instruments, instrument]);
  
        // Reset the newInstrumentData state
        setNewInstrumentData({
          instrumentName: "",
          instrumentId: "",
          instrumentQuantity: "",
          instrumentLocation: "",
        });
        // Fetching the updated list of instruments in the set
        fetchInstruments(); 
  
        setInstrumentSearchModal(false);
      } else {
        const data = await response.json();
        console.error("Error adding instrument to set:", data.error);
      }
    } catch (error) {
      console.error("Error adding instrument to set:", error);
    }
  };
  

  // fetching instruments related to the set
  useEffect(() => {
    console.log(id);
    fetch(`/api/instrumentSets/${id}/instruments`)
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
    console.log(instrumentId);
    console.log(id);
    try {
      const response = await fetch(
        `/api/instrumentSets/${instrumentId}/deleteInstrument/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
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
  };

  //function to add a new instrument to set
  const handleAddInstrument = async () => {
    console.log(newInstrumentData);
    try {
      const response = await fetch(
        `/api/instrumentSets/${id}/addNewInstrument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newInstrumentData),
        }
      );

      if (response.ok) {
        fetchInstruments();

        setNewInstrumentData({
          instrumentName: "",
          instrumentId: "",
          instrumentQuantity: "",
          instrumentLocation: "",
        });
      } else {
        console.error(
          "Error adding instrument to the set:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding instrument to the set:", error);
    }
  };

  return (
    <div className={styles.setWrapper}>
      <div className={styles.header}>Instrument List</div>
      <div className={styles.tableContainer}>
        <table className={styles.instrumentsTable}>
          <thead>
            <tr>
              <th>Instrument Name</th>
              <th>Instrument ID</th>
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
            <tr className={styles.instrumentItem}>
              <td>
                <input
                  type="text"
                  value={newInstrumentData.instrumentName}
                  onChange={(e) =>
                    setNewInstrumentData({
                      ...newInstrumentData,
                      instrumentName: e.target.value,
                    })
                  }
                  placeholder="Instrument Name"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newInstrumentData.instrumentId}
                  onChange={(e) =>
                    setNewInstrumentData({
                      ...newInstrumentData,
                      instrumentId: e.target.value,
                    })
                  }
                  placeholder="Instrument ID"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newInstrumentData.instrumentQuantity}
                  onChange={(e) =>
                    setNewInstrumentData({
                      ...newInstrumentData,
                      instrumentQuantity: e.target.value,
                    })
                  }
                  placeholder="Quantity"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newInstrumentData.instrumentLocation}
                  onChange={(e) =>
                    setNewInstrumentData({
                      ...newInstrumentData,
                      instrumentLocation: e.target.value,
                    })
                  }
                  placeholder="Location"
                />
              </td>
              <td>
                <button
                  className={styles.addInstrumentBtn}
                  onClick={handleAddInstrument}
                >
                  Add Instrument
                </button>
              </td>
            </tr>
          </tbody>
        </table>
       
         {user?.role === "ADMIN" && (
              <button
              className={styles.addButton}
              onClick={openSearchInstrumentModal}
            >
              Add Instrument
            </button>
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
