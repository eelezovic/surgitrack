import React, { useState, useEffect } from "react";
import styles from "../pages/InstrumentsListPage.module.css";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import InstrumentPage from "../pages/InstrumentPage";

function InstrumentsListPage() {
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
    fetch("/api/singleInstruments")
      .then((response) => response.json())
      .then((data) => setSetData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.instrumentsListPageContainer}>
       <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
       <Table
        data={currentPosts}
        headers={headers}
      />
       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={allPosts.length}
        paginate={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default InstrumentsListPage;