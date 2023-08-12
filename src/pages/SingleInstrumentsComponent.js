import React, { useState, useEffect } from "react";
import styles from "../pages/SingleInstrumentsComponent.module.css";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { SingleInstrumentsData } from "../components/dataStorage/SingleInstrumentsData";
import Pagination from "../components/Pagination";
import MiniModal from "../components/MiniModal";

function SingleInstrumentsComponent() {
  const headers = [
    { name: "Instrument Name", accessor: "instrument_name" },
    { name: "ID", accessor: "instrument_id" },
    { name: "Quantity", accessor: "instrument_quantity" },
    { name: "Location", accessor: "instrument_location" },
    { name: "Action", accessor: "set_action" },
  ];
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [setData, setSetData] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [miniModalOpen, setMiniModalOpen] = useState(false);

  const handleEditRow = (event, item) => {
    event.stopPropagation();
    setRowToEdit(item);
    setMiniModalOpen(true);
  };

  // to update an exisiting instrument 
  const updateInstrumentOnServer = (newRow) => {
    const updatedData = {
      instrumentName: newRow.instrument_name,
      instrumentId: newRow.instrument_id,
      instrumentQuantity: newRow.instrument_quantity,
      instrumentLocation: newRow.instrument_location,
    };

    return fetch(`/singleInstruments/${newRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  };

  const handleDelete = (event, item) => {
    event.stopPropagation();
    fetch(`/singleInstruments/${item.id}`, {
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
          instrumentLocation: newRow.instrument_location
        };
        console.log(newRow);
        const response = await fetch('/singleInstruments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newInstrumentData)
        });
        const responseData = await response.json();
        console.log(responseData.message);
  
        setSetData([...setData, newRow]);
      } else {
        await updateInstrumentOnServer(newRow);
        const updatedData = setData.map((currentRow) =>
          currentRow.instrument_id === rowToEdit.instrument_id ? newRow : currentRow
        );
        setSetData(updatedData);
        setRowToEdit(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setMiniModalOpen(false);
  };
  

  function getDataWithSearchString(data) {
    return data.filter((item) =>
      ["instrument_name", "instrument_id", "instrument_location"].some((key) =>
        item[key].toUpperCase().includes(query.toUpperCase())
      )
    );
  }

  const handlePagination = (pageNumbers) => setCurrentPage(pageNumbers);

  const allPosts = getDataWithSearchString(setData);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  //fetching data from the API
  const fetchData = () => {
    fetch("/singleInstruments")
      .then((response) => response.json())
      .then((data) => setSetData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.singleInstrumentContainer}>
      <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
      <Table
        data={currentPosts}
        headers={headers}
        editRow={handleEditRow}
        handleDelete={handleDelete}
      />
      {miniModalOpen && (
        <MiniModal
          closeMiniModal={() => {
            setMiniModalOpen(false);
            setRowToEdit(null);
          }}
          componentType="singleInstrument"
          onSubmit={handleSubmit}
          defaultValue={
            rowToEdit
              ? {
                  setName: rowToEdit.instrument_name,
                  setId: rowToEdit.instrument_id,
                  setQuantity: rowToEdit.instrument_quantity,
                  setLocation: rowToEdit.instrument_location,
                  id: rowToEdit.id,
                }
              : null
          }
        />
      )}
      <button
        className={styles.addButton}
        onClick={() => setMiniModalOpen(true)}
      >
        Add
      </button>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={allPosts.length}
        paginate={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
}

export default SingleInstrumentsComponent;
