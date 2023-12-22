import React, { useEffect, useState } from "react";
import styles from "../pages/InstrumentPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImageModal from "../components/ImageModal";

function InstrumentPage({ user }) {
  const canPerformActions = user?.role === "ADMIN";
  const { id } = useParams();
  const navigate = useNavigate();
  const [instrumentData, setInstrumentData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_APP_API;

  const handleImageClick = () => {
    setOpenImageModal(true);
  };

  const handleEdit = (field, value) => {
    setInstrumentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const updateInstrumentOnServer = async (newRow) => {
    try {
      const updatedData = {
        instrumentName: newRow.instrument_name,
        instrumentId: newRow.instrument_id,
        instrumentQuantity: newRow.instrument_quantity,
        instrumentLocation: newRow.instrument_location,
        instrumentImage: newRow.instrument_image,
      };

      const response = await fetch(
        `${apiBaseUrl}/singleInstruments/${newRow.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Instrument updated successfully");
        setIsEditing(false);
        navigate("/instruments");
      } else {
        console.error("Error updating instrument:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating instrument:", error);
    }
  };

  const handleSave = async () => {
    if (user?.role === "ADMIN") {
      const response = await updateInstrumentOnServer(instrumentData);
      if (response.ok) {
        console.log("Instrument updated successfully");
        navigate("/instruments");
        setIsEditing(false);
      } else {
        console.error("Error updating instrument:", response.statusText);
      }
    }
  };

  const handleImageChange = (id, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setInstrumentData((prevData) => ({
        ...prevData,
        instrument_image: reader.result,
      }));
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  //function to delete an instrument
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this instrument?"
    );

    if (isConfirmed) {
      const deleteUrl = `/api/singleInstruments/${id}`;

      // Sending a DELETE request to delete the instrument
      fetch(deleteUrl, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setIsDeleted(true);
            navigate("/instruments");
          } else {
            console.error("Error deleting instrument:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting instrument:", error);
        });
    }
  };

  // Fetching instrument data based on the id
  useEffect(() => {
    fetch(`${apiBaseUrl}/singleInstruments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setInstrumentData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

 

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <h2 className={styles.header}>Instrument Details</h2>
        <table className={styles.table}>
          <thead
            className={`${styles.thead} ${isEditing ? styles.editing : ""}`}
          >
            <tr>
              <th className="name">Name</th>
              <th className="instumentId">ID</th>
              <th className="quantity">Quantity</th>
              <th className="location">Location</th>
              <th className="image">Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={isEditing ? styles.editing : ""}>
                {isEditing ? (
                  <input
                    type="text"
                    value={instrumentData.instrument_name}
                    onChange={(e) =>
                      handleEdit("instrument_name", e.target.value)
                    }
                  />
                ) : (
                  instrumentData.instrument_name
                )}
              </td>
              <td className={isEditing ? styles.editing : ""}>
                {isEditing ? (
                  <input
                    type="text"
                    value={instrumentData.instrument_id}
                    onChange={(e) =>
                      handleEdit("instrument_id", e.target.value)
                    }
                  />
                ) : (
                  instrumentData.instrument_id
                )}
              </td>
              <td className={isEditing ? styles.editing : ""}>
                {isEditing ? (
                  <input
                    type="number"
                    value={instrumentData.instrument_quantity}
                    onChange={(e) =>
                      handleEdit("instrument_quantity", e.target.value)
                    }
                  />
                ) : (
                  instrumentData.instrument_quantity
                )}
              </td>
              <td className={isEditing ? styles.editing : ""}>
                {isEditing ? (
                  <input
                    type="text"
                    value={instrumentData.instrument_location}
                    onChange={(e) =>
                      handleEdit("instrument_location", e.target.value)
                    }
                  />
                ) : (
                  instrumentData.instrument_location
                )}
              </td>
              <td className={isEditing ? styles.editing : ""}>
                {isEditing ? (
                  <label className={styles.customFileInputWrapper}>
                    <span className={styles.customFileInput}>Upload image</span>
                    <input
  type="file"
  className={styles.customFileInputHidden}
  onChange={(e) => handleImageChange(id, e)}
/>

                  </label>
                ) : (
                  <img
                    src={`data:image/jpeg;base64,${instrumentData.instrument_image}`}
                    alt="Instrument"
                    className={styles.imageStyle}
                    style={{ width: "60px", height: "60px" }}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
   
        {isEditing ? (
          <div className={styles.saveAndDeleteButtonContainer}>
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              Delete
            </button>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            {canPerformActions && (
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            <button
              className={styles.viewImageButton}
              onClick={handleImageClick}
            >
              View image
            </button>
          </div>
        )}
      </div>
      {openImageModal && (
        <ImageModal
          closeImageModal={() => setOpenImageModal(false)}
          imageData={instrumentData.instrument_image}
        />
      )}
    </div>
  );
}

export default InstrumentPage;

/*import React, { useState, useEffect } from "react";
import styles from "../pages/InstrumentPage.module.css";
import Table from "../components/Table";
import { useParams } from "react-router-dom"; //Imported params hook

function InstrumentPage({ user, setData, setSetData, allPosts }) {
  const [instrumentData, setInstrumentData] = useState(null);
  const { id } = useParams(); //i have prop

  const canPerformActions = user?.role === "ADMIN";

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditRow = (event, item) => {
    event.stopPropagation();
    setRowToEdit(item);
    // setMiniModalOpen(true);
  };

  // to update an exisiting instrument
  const updateInstrumentOnServer = (newRow) => {
    const updatedData = {
      instrumentName: newRow.instrument_name,
      instrumentId: newRow.instrument_id,
      instrumentQuantity: newRow.instrument_quantity,
      instrumentLocation: newRow.instrument_location,
    };
    console.log(newRow);
    return fetch(`/api/singleInstruments/${newRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  };

  //To Delete an existing instrument
  const handleDelete = (event, item) => {
    console.log(`/singleInstruments/${item.id}`);
    console.log(item.id);
    console.log("Deleting item:", item);

    event.stopPropagation();
    fetch(`/api/singleInstruments/${item.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        const updatedData = allPosts.filter(
          (dataItem) => dataItem.id !== item.id
        );
        setSetData(updatedData);
      });
  };

  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        const newInstrumentData = {
          instrumentName: newRow.instrument_name,
          instrumentId: newRow.instrument_id,
          instrumentQuantity: newRow.instrument_quantity,
          instrumentLocation: newRow.instrument_location,
        };
        console.log(newRow);
        const response = await fetch("/api/singleInstruments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newInstrumentData),
        });
        const responseData = await response.json();
        console.log(responseData.message);

        setSetData([...setData, newRow]);
      } else {
        await updateInstrumentOnServer(newRow);
        const updatedData = setData.map((currentRow) =>
          currentRow.instrument_id === rowToEdit.instrument_id
            ? newRow
            : currentRow
        );
        setSetData(updatedData);
        setRowToEdit(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    //setMiniModalOpen(false);
  };

  //Fetching instrument data using the "id" parameter
  useEffect(() => {
    console.log("ID:", id); 
    if (id) {
      fetch(`/api/singleInstruments/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setInstrumentData(data);
        })
        .catch((error) => {
          console.error("Error fetching instrument data:", error);
        });
    }
  }, [id]);

  return (
    <div className={styles.InstrumentPageContainer}>
      {instrumentData ? ( 
        <div>
          <h2>Instrument Details</h2>
          <p>Instrument Name: {instrumentData.instrument_name}</p>
          <p>Instrument ID: {instrumentData.instrument_id}</p>
          <p>Quantity: {instrumentData.instrument_quantity}</p>
          <p>Location: {instrumentData.instrument_location}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Table
        editRow={canPerformActions ? handleEditRow : null}
        handleDelete={canPerformActions ? handleDelete : null}
        canPerformActions={user?.role === "ADMIN"}
      />
    </div>
  );
}

export default InstrumentPage;
*/
