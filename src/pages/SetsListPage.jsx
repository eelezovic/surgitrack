import React, { useState, useEffect } from "react";
import styles from "../pages/SetsListPage.module.css";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

function SetsListPage({ user }) {
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
  const [setData, setSetData] = useState([]);
  const [setModalOpen, setSetModalOpen] = useState(false);
  const navigateTo = useNavigate();

  const [newSetData, setNewSetData] = useState({});

  const handleSetClick = (set) => {
     navigateTo(`/sets/${set.id}`);
  }

  const getDataWithSearchString = (data) => {
    return data.filter((item) =>
      ["set_name", "set_id", "set_location"].some(
        (key) =>
          item[key] && item[key].toUpperCase().includes(query.toUpperCase())
      )
    );
  };

  const handlePagination = (pageNumbers) => setCurrentPage(pageNumbers);
  const allPosts = getDataWithSearchString(setData);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  //fetching data from the API
  const fetchData = () => {
    fetch("/api/instrumentSets")
      .then((response) => response.json())
      .then((data) => setSetData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div div className={styles.setsListPageContainer}>
      <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
      <Table
        data={currentPosts}
        headers={headers}
        onRowClick={handleSetClick}
      />
      {user?.role && (
        <button
          className={styles.addButton}
          onClick={() => setInstrumentModalOpen(true)}
        >
          Add New Set
        </button>
        )}
    </div>
  );
}

export default SetsListPage;