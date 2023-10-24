import React, { useEffect, useState } from "react";
import styles from "../pages/SetsPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SetsPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [setData, setSetData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [instruments, setInstruments] = useState([]); 
  const [newInstrumentData, setNewInstrumentData] = useState({
    instrumentName: "",
    instrumentId: "",
    instrumentQuantity: "",
    instrumentLocation: "",
  });


  const handleEdit = (field, value) => {
    setSetData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const updateSetOnServer = async (newRow) => {
    try {
      const updatedData = {
        setName: newRow.set_name,
        setId: newRow.set_id,
        setQuantity: newRow.set_quantity,
        setLocation: newRow.set_location,
      };
      const response = await fetch(`/api/instrumentSets/${newRow.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setIsEditing(false);
        navigate("/sets");
      } else {
        console.error("Error updating set:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating set:", error);
    }
  };

  const handleSave = async () => {
    if (user?.role === "ADMIN") {
      const response = await updateSetOnServer(setData);
      if (response) {
        console.log("Set updated successfully");
        setIsEditing(false);
      } else {
        console.error("Error updating set:", response);
      }
    }
  };

// Function to delete Set from db
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this instrument?"
    );

    if (isConfirmed) {
      const deleteUrl = `/api/instrumentSets/${id}`;
      // Sending a DELETE request to delete the set
      fetch(deleteUrl, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setIsDeleted(true);
            navigate("/sets");
          } else {
            console.error("Error deleting set:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting set:", error);
        });
    }
  };

  // Fetching set data based on the id
  useEffect(() => {
    fetch(`/api/instrumentSets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSetData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  // fetching instruments related to the set
  useEffect(() => {
    fetch(`/api/instrumentSets/${id}/instruments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch instruments.");
        }
        return response.json();
      })
      .then((data) => {
        setInstruments(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching instruments:", error);
      });
  }, [id]);

  //Function to delete an instrumenent from the Set
  const handleDeleteInstrument = async (instrumentId) => {
    console.log( instrumentId); 
    console.log(id); 
    try {
      const response = await fetch(`/api/instrumentSets/${instrumentId}/deleteInstrument/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Instrument deleted from the set successfully");
        
      } else {
        console.error("Error deleting instrument from the set:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting instrument from the set:", error);
    }
  };

//function to add a new instrument to set
const handleAddInstrument = async () => {
  console.log( newInstrumentData);
  try {
    const response = await fetch(`/api/instrumentSets/${id}/addNewInstrument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInstrumentData),
    });

    if (response.ok) {
      fetchInstruments();
      // to Clear the form
      setNewInstrumentData({
        instrumentName: "",
        instrumentId: "",
        instrumentQuantity: "",
        instrumentLocation: "",
      });
    } else {
      console.error("Error adding instrument to the set:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding instrument to the set:", error);
  }
};
  
  return (
    <div className={styles.setWrapper}>
      <div className={styles.header}>{setData.set_name} Set</div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className="name">Name</th>
              <th className="setId">Set ID</th>
              <th className="quantity">Quantity</th>
              <th className="location">Location</th>
              {isEditing && <th className="save">Save</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={setData.set_name}
                    onChange={(e) => handleEdit("set_name", e.target.value)}
                  />
                ) : (
                  setData.set_name
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={setData.set_id}
                    onChange={(e) => handleEdit("set_id", e.target.value)}
                  />
                ) : (
                  setData.set_id
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={setData.set_quantity}
                    onChange={(e) => handleEdit("set_quantity", e.target.value)}
                  />
                ) : (
                  setData.set_quantity
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={setData.set_location}
                    onChange={(e) => handleEdit("set_location", e.target.value)}
                  />
                ) : (
                  setData.set_location
                )}
              </td>
              {isEditing && (
                <td>
                  <button className={styles.saveButton} onClick={handleSave}>
                    Save
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
        {!isEditing && (
          <button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete
          </button>
        )}
     
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
          <button className={styles.deleteInstrumentBtn} onClick={() => handleDeleteInstrument(instrument.id)}>Delete</button>
        </td>
      </tr>
    ))}
    <tr className={styles.instrumentItem}>
    <td>
      <input
        type="text"
        value={newInstrumentData.instrumentName}
        onChange={(e) => setNewInstrumentData({ ...newInstrumentData, instrumentName: e.target.value })}
        placeholder="Instrument Name"
      />
    </td>
    <td>
      <input
        type="text"
        value={newInstrumentData.instrumentId}
        onChange={(e) => setNewInstrumentData({ ...newInstrumentData, instrumentId: e.target.value })}
        placeholder="Instrument ID"
      />
    </td>
    <td>
      <input
        type="number"
        value={newInstrumentData.instrumentQuantity}
        onChange={(e) => setNewInstrumentData({ ...newInstrumentData, instrumentQuantity: e.target.value })}
        placeholder="Quantity"
      />
    </td>
    <td>
      <input
        type="text"
        value={newInstrumentData.instrumentLocation}
        onChange={(e) => setNewInstrumentData({ ...newInstrumentData, instrumentLocation: e.target.value })}
        placeholder="Location"
      />
    </td>
    <td>
      <button className={styles.addInstrumentBtn} onClick={handleAddInstrument}>Add Instrument</button>
    </td>
  </tr>
  </tbody>
</table>
</div>
    </div>
  );
}

export default SetsPage;
