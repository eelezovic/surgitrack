import React, { useState } from "react";
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
  const [setData, setSetData] = useState(SingleInstrumentsData);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [miniModalOpen, setMiniModalOpen] = useState(false);

  const handleEditRow = (event,item) => {
    event.stopPropagation();
    setRowToEdit(item);
    setMiniModalOpen(true);
  };

  const handleDelete = (event, item) => {
    event.stopPropagation();
    const updatedData = setData.filter((dataItem) => dataItem.id !== item.id);
    setSetData(updatedData);
  };
  

  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      setSetData([...setData, newRow]);
    } else {
      const updatedData = setData.map((currentRow) =>
        currentRow.instrument_id === rowToEdit.instrument_id ? newRow : currentRow
      );
      setSetData(updatedData);
      setRowToEdit(null);
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
                    id: rowToEdit.id
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
