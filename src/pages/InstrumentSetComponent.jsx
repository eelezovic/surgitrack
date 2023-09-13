import React, { useState } from "react";
import styles from "../pages/InstrumentSetComponent.module.css";
import { setData as InstrumentSetData } from "../components/dataStorage/InstrumentSetData";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import MiniModal from "../components/MiniModal";

const InstrumentSetComponent = () => {
  const headers = [
    { name: "Set Name", accessor: "set_name" },
    { name: "ID", accessor: "set_id" },
    { name: "Quantity", accessor: "set_quantity" },
    { name: "Location", accessor: "set_location" },
    { name: "Action", accessor: "set_action" },
  ];

  const [selected, setSelected] = useState("Select specialty");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [miniModalOpen, setMiniModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [setData, setSetData] = useState(InstrumentSetData);

  const handleEditRow = (event, item) => {
    event.stopPropagation();
    setRowToEdit(item);
    setMiniModalOpen(true);
  };

  const handleDelete = (event, item) => {
    event.stopPropagation();
    const updatedData = allPosts.filter((dataItem) => dataItem.id !== item.id);
    setSetData(updatedData);
  };

  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      setSetData([...setData, newRow]);
    } else {
      const updatedData = setData.map((currentRow) =>
        currentRow.set_id === rowToEdit.set_id ? newRow : currentRow
      );
      setSetData(updatedData);
      setRowToEdit(null);
    }
    setMiniModalOpen(false);
  };

  const getDataWithSearchString = (data) => {
    return data.filter((item) =>
      ["set_name", "set_id", "set_location"].some((key) =>
        item[key].toUpperCase().includes(query.toUpperCase())
      )
    );
  };

  const handleDropdownSelect = (option) => {
    setSelected(option);
    setCurrentPage(1);
    handlePagination(1);
  };

  const handlePagination = (pageNumbers) => setCurrentPage(pageNumbers);
  const allPosts = getDataWithSearchString(setData);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.instrumentSetContainer}>
      <div className={styles.dropDown}>
        <Dropdown selected={selected} setSelected={handleDropdownSelect} />
      </div>
      <div className={styles.mainContainer}>
        <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
        <Table
          headers={headers}
          data={currentPosts}
          selectedSpecialty={selected}
          editRow={handleEditRow}
          handleDelete={handleDelete}
        />
        {miniModalOpen && (
          <MiniModal
            closeMiniModal={() => {
              setMiniModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={
              rowToEdit
                ? {
                    setName: rowToEdit.set_name,
                    setId: rowToEdit.set_id,
                    setQuantity: rowToEdit.set_quantity,
                    setLocation: rowToEdit.set_location,
                    setImage: rowToEdit.set_image,
                    setContent: rowToEdit.set_content,
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
    </div>
  );
};

export default InstrumentSetComponent;