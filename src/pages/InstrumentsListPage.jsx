import React, { useState, useEffect } from "react";
import styles from "../pages/InstrumentsListPage.module.css";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import {  useNavigate } from "react-router-dom"; //I have imported useNavigate in order to navigate on click


function InstrumentsListPage({user}) {
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
  const navigateTo = useNavigate(); // added this in order to make navigation work

  const handleInstrumentClick = (instrument) => { //I have a function that will navigate to corresponding instrument when clicked 
    navigateTo(`/instruments/${instrument.id}`);
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
    fetch("/api//singleInstruments/:id")
 // Do you think i should add 'id' at the end like this "fetch("/api/singleInstruments/id")"
      .then((response) => response.json())
      .then((data) => {
        console.log( data);
        setSetData(data);
      })
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
        onRowClick={handleInstrumentClick}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={allPosts.length}
        paginate={handlePagination}
        currentPage={currentPage}
      />
        {user?.role === "ADMIN" && (
          <button
            className={styles.addButton}
            onClick={() => setMiniModalOpen(true)}
          >
            Add New Instrument
          </button>
        )}
    </div>
  );
}

export default InstrumentsListPage;
