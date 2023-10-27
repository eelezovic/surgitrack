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
  ];

  const [selected, setSelected] = useState("Select specialty");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [setData, setSetData] = useState([]);
  const [setModalOpen, setSetModalOpen] = useState(false);
  const [newSetData, setNewSetData] = useState({});
  const [editingRows, setEditingRows] = useState([]);
  const [editedData, setEditedData] = useState({});

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
      console.log(newSetData);
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
  

  // 
  const handleEditFieldChange = (rowId, field, value) => {
    // Update the edited data in the state
    setEditedData((prevData) => ({
      ...prevData,
      [rowId]: {
        ...prevData[rowId],
        [field]: value,
      },
    }));
  };

  //This also seems to be working fine 
  const toggleEditMode = (rowId) => {
    if (editingRows.includes(rowId)) {
      setEditingRows(editingRows.filter((id) => id !== rowId));
    } else {
      setEditingRows([...editingRows, rowId]);
    }
  };

  // This function is working fine, I am able to delete set from the table and db
  const handleDeleteClick = async (setId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this set?"
    );
    if (isConfirmed) {
    try {
      const response = await fetch(`/api/instrumentSets/${setId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {

        setSetData((prevData) => prevData.filter((item) => item.id !== setId));
        navigate("/sets");
      } else {
        const data = await response.json();
        console.error("Error deleting set:", data.error);
      }
    } catch (error) {
      console.error("Error deleting set:", error);
    }
  }
  };


  // This is where i am having some issues. I have created updatedData in order to
 // update db with the new data. I am then inserting in the fetch ${editedItem.id} 
  const updateSetOnServer = async (editedItem) => {
    try {
      const updatedData = {
        setName: editedItem.set_name,
        setId: editedItem.set_id,
        setQuantity: editedItem.set_quantity,
        setLocation: editedItem.set_location,
      };

      console.log(updatedData)  //It returns undefined data (emopty object)

      const response = await fetch(`/api/instrumentSets/${editedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), //I am strinfying the updatedData 
      });
      setSetData([...setData, editedItem]);  //here i am adding new data to the exsisting array
      if (response.ok) {
        setIsEditing(false);
        /*navigate("/sets");*/
      } else {
        console.error("Error updating set:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating set:", error);
    }
  };

  const handleSave = async () => {
    if (user?.role === "ADMIN") {
      const response = await updateSetOnServer(setData);
      if (response) {
        console.log("Set updated successfully");
        setIsEditing(false);
      } else {
        console.error("Error updating set:", response);
      }
    }
  };

  return (
    <div div className={styles.setsListPageContainer}>
      <div className={styles.dropDown}>
        <Dropdown selected={selected} setSelected={handleDropdownSelect} />
      </div>
      <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
      {/*<Table
        data={currentPosts}
        headers={headers}
        onRowClick={handleSetClick}
  />*/}
      <div className={styles.tableContainer}>
      <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.accessor}>{header.name}</th>
          ))}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts.map((item) => (
          <tr key={item.id}>
            {headers.map((header) => (
              <td key={header.accessor}>
                {editingRows.includes(item.id) ? (
                  <input
                    type="text"
                    value={editedData[item.id] ? editedData[item.id][header.accessor] : item[header.accessor]}
                    onChange={(e) => handleEditFieldChange(item.id, header.accessor, e.target.value)}
                  />
                ) : (
                  item[header.accessor]
                )}
              </td>
            ))}
            <td>
              {editingRows.includes(item.id) ? (
              <button onClick={() => handleSave(item.id)}>Save</button>
              ) : (
                <button onClick={() => toggleEditMode(item.id)}>Edit</button>
              )}
            </td>
            <td>
              <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

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
