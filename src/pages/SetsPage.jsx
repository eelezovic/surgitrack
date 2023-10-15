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
  const [instruments, setInstruments] = useState([]); // news state for instruments

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

  

  return (
    <div className={styles.setWrapper}>
      <h2 className={styles.header}>Set Details</h2>
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
      </div>
      <h3 className={styles.instrumentsHeader}>Instruments in this Set</h3>
      <ul className={styles.instrumentsList}>
        {instruments.map((instrument) => (
          <li key={instrument.id} className={styles.instrumentItem}>
            <div className={styles.instrumentInfo}>
              <span className={styles.instrumentName}>
                {instrument.instrument_name}
              </span>
              <span className={styles.instrumentID}>
                ID: {instrument.instrument_id}
              </span>
              <span className={styles.instrumentQuantity}>
                Quantity: {instrument.instrument_quantity}
              </span>
              <span className={styles.instrumentLocation}>
                Location: {instrument.instrument_location}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SetsPage;
