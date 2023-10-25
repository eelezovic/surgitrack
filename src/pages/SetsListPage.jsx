import React, { useState, useEffect } from "react";
import styles from "../pages/SetsListPage.module.css";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import SetModal from "../components/SetModal";

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
  const [newSetData, setNewSetData] = useState({});
  const navigateTo = useNavigate();


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

  const handleSubmit = async (newRow) => {
    try {
      const newSetData = {
        setName: newRow.set_name,
        setId: newRow.set_id,
        setQuantity: newRow.set_quantity,
        setLocation: newRow.set_location,
      };
  console.log(newSetData)
  const response = await fetch("/api/instrumentSets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSetData),
      });
      const responseData = await response.json();
      console.log(responseData.message);

      setSetData([...setData, newRow]);
      if (response.ok) {
        fetchData(); 
        setSetModalOpen(false); 

        // Clear the form fields if needed
        setNewSetData({
          set_name: "",
          set_id: "",
          set_quantity: "",
          set_location: "",
        });
      } else {
        const data = await response.json();
        console.error("Error adding  set:", data.error);
      }
    } catch (error) {
      console.error("Error adding  set:", error);
    }
  };
  
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
      <div className={styles.dropDown}>
        <Dropdown selected={selected} setSelected={handleDropdownSelect} />
      </div>
      <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
      <Table
        data={currentPosts}
        headers={headers}
        onRowClick={handleSetClick}
      />
      {setModalOpen && (
        <SetModal
          closeSetModal={() => {
            setSetModalOpen(false);
          }}
          onSubmit={handleSubmit}
          defaultValue={{
            setName: newSetData.set_name,
            setId: newSetData.set_id,
            setQuantity: newSetData.set_quantity,
            setLocation: newSetData.set_location,
            id: newSetData.id,
          }}
        />
      )}
      {user?.role && (
        <button
          className={styles.addButton}
          onClick={() => setSetModalOpen(true)}
        >
          Add New Set
        </button>
        )}
    </div>
  );
}

export default SetsListPage;