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
  const [postsPerPage] = useState(10);
  const [miniModalOpen, setMiniModalOpen] = useState(false);

  const getDataWithSearchString = (data) => {
    return data.filter((item) =>
      ["set_name", "set_id", "set_location"].some((key) =>
        item[key].toUpperCase().includes(query.toUpperCase())
      )
    );
  };

  const handlePagination = (pageNumbers) => setCurrentPage(pageNumbers);

  const allPosts = getDataWithSearchString(InstrumentSetData);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.instrumentSetContainer}>
      <div className={styles.dropDown}>
        <Dropdown selected={selected} setSelected={setSelected} />
      </div>
      <div className={styles.mainContainer}>
        <SearchBar setQuery={setQuery} />
        <Table
          headers={headers}
          data={currentPosts}
          selectedSpecialty={selected}
        />
        {miniModalOpen && (
          <MiniModal
            closeMiniModal={() => {
              setMiniModalOpen(false);
            }}
            addItem={(item) => {
              InstrumentSetData.push(item);
            }}
          />
        )}
        <button
          className={styles.button}
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

