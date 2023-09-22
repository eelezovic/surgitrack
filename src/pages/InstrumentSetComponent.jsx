import React, { useState, useEffect  } from "react";
import styles from "../pages/InstrumentSetComponent.module.css";
import { setData as InstrumentSetData } from "../components/dataStorage/InstrumentSetData";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import MiniModal from "../components/MiniModal";

const InstrumentSetComponent = ({ user }) => {
  const headers = [
    { name: "Set Name", accessor: "set_name" },
    { name: "ID", accessor: "set_id" },
    { name: "Quantity", accessor: "set_quantity" },
    { name: "Location", accessor: "set_location" },
    { name: "Action", accessor: "set_action" },
  ];

  const canPerformActions = user?.role === "ADMIN";

  const [selected, setSelected] = useState("Select specialty");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [miniModalOpen, setMiniModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [setData, setSetData] = useState([]);

  const handleEditRow = (event, item) => {
    event.stopPropagation();
    setRowToEdit(item);
    setMiniModalOpen(true);
  };

  const updateSetOnServer = (newRow) => {
    const updatedData = {
      setName: newRow.set_name,
      setId: newRow.set_id,
      setQuantity: newRow.set_quantity, 
      setLocation: newRow.set_location,
    };

    console.log("updatedData:", updatedData);
    console.log("newRow:", newRow);


    return fetch(`/api/instrumentSets/${newRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      
    });
  };

 const handleDelete = (event, item) => {
    console.log(`/instrumentSets/${item.id}`);
    console.log(item.id);
    console.log("Deleting item:", item);

    event.stopPropagation();
    fetch(`/api/instrumentSets/${item.id}`, {
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
        const newSetData = {
          setName: newRow.set_name,
          setId: newRow.set_id,
          setQuantity: newRow.set_quantity,
          setLocation: newRow.set_location,
        };
        console.log(newSetData)
        console.log(newRow);
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
      } else {
        await updateSetOnServer(newRow);
        const updatedData = setData.map((currentRow) =>
          currentRow.set_id === rowToEdit.set_id
            ? newRow
            : currentRow
        );
        setSetData(updatedData);
        setRowToEdit(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setMiniModalOpen(false);
  };


const getDataWithSearchString = (data) => {
  return data.filter((item) =>
    ["set_name", "set_id", "set_location"].some((key) =>
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
    <div className={styles.instrumentSetContainer}>
      <div className={styles.dropDown}>
        <Dropdown selected={selected} setSelected={handleDropdownSelect} />
      </div>
      <div className={styles.mainContainer}>
        <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
        <Table
         data={currentPosts}
          headers={headers}
          editRow={canPerformActions ? handleEditRow : null}
          handleDelete={canPerformActions ? handleDelete : null}
          canPerformActions={user?.role === "ADMIN"}
          selectedSpecialty={selected}
        />
        {miniModalOpen && (
          <MiniModal
            closeMiniModal={() => {
              setMiniModalOpen(false);
              setRowToEdit(null);
            }}
            componentType="instrumentSets"
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
        {user?.role === "ADMIN" && (
        <button
          className={styles.addButton}
          onClick={() => setMiniModalOpen(true)}
        >
          Add
        </button>
      )}
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
