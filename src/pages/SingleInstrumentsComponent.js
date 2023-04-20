import React, { useState } from "react";
import styles from "../pages/SingleInstrumentsComponent.module.css";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { SingleInstrumentsData } from "../components/dataStorage/SingleInstrumentsData";
import Pagination from "../components/Pagination";
import MiniModal from "../components/MiniModal";

function SingleInstrumentsComponent() {
  const headers = [{name: 'Instrument Name', accessor: 'instrument_name'},{name: 'ID', accessor: 'instrument_id'}, { name: 'Quantity', accessor: 'instrument_quantity'}, { name: 'Location',accessor: 'instrument_location'},  { name: "Action", accessor: "set_action" },];
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  
  const getDataWithSearchString = (data) => {
    return data.filter((item) =>
      ["instrument_name", "instrument_id", "instrument_location"].some((key) =>
        item[key].toUpperCase().includes(query.toUpperCase())
      )
    );
  };

  const handlePagination = (pageNumbers) => setCurrentPage(pageNumbers);

  const allPosts = getDataWithSearchString(SingleInstrumentsData);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const [miniModalOpen, setMiniModalOpen] = useState(false);

  return (
    <div className={styles.singleInstrumentContainer}>
      <SearchBar setQuery={setQuery} />
      <Table data={currentPosts} query={query} headers={headers} />
      {miniModalOpen && (
          <MiniModal
            closeMiniModal={() => {
              setMiniModalOpen(false);
            }}
            addItem={(item) => {
              SingleInstrumentsData.push(item);
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
  );
}

export default SingleInstrumentsComponent;

