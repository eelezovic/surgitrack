import React, { useState } from "react";
import styles from "../pages/SingleInstrumentsComponent.module.css";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { SingleInstrumentsData } from "../components/dataStorage/SingleInstrumentsData";
import Pagination from "../components/Pagination";

function SingleInstrumentsComponent() {
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

  return (
    <div className={styles.singleInstrumentContainer}>
      <SearchBar setQuery={setQuery} />
      <Table data={currentPosts} query={query} />
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

