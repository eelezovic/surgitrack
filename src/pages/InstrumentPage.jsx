import React, { useState, useEffect } from "react";
import styles from "../pages/InstrumentPage.module.css";
import Table from "../components/Table";

function InstrumentPage({user, setData, setSetData, allPosts}) {

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

  return (
    <div className={styles.InstrumentPageContainer}>
      <Table
        editRow={canPerformActions ? handleEditRow : null}
        handleDelete={canPerformActions ? handleDelete : null}
        canPerformActions={user?.role === "ADMIN"}
      />


    </div>
  );
}

export default InstrumentPage;
