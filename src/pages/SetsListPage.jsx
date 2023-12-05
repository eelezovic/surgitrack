import React, { useState, useEffect } from "react";
import styles from "../pages/SetsListPage.module.css";
import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import SetModal from "../components/SetModal";

function SetsListPage({ user }) {
  const headers = [
    { name: "Set", accessor: "set_name" },
    { name: "ID", accessor: "set_id" },
    { name: "Quantity", accessor: "set_quantity" },
    { name: "Location", accessor: "set_location" },
    { name: "Specialty", accessor: "select_specialty" },
    { name: "Image", accessor: "set_image" },
  ];

  const canPerformActions = user?.role === "ADMIN";
  const [selected, setSelected] = useState("Select specialty");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [setData, setSetData] = useState([]);
  const [setModalOpen, setSetModalOpen] = useState(false);
  const [newSetData, setNewSetData] = useState({});
  const [editingRows, setEditingRows] = useState([]);
  const [editedData, setEditedData] = useState({});
  const navigateTo = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_APP_API;

  const handleSetClick = (set) => (e) => {
    if (
      !editingRows.length &&
      (e.target.tagName.toLowerCase() !== "button" ||
        !["editButton", "deleteButton", "saveButton"].some((cls) =>
          e.target.classList.contains(styles[cls])
        ))
    ) {
      navigateTo(`/sets/${set.id}`);
      s;
    }
  };

  const renderImage = (imageString) => {
    return (
      <img
        src={`data:image/png;base64, ${imageString}`}
        alt="Set Image"
        className={styles.setImageStyle}
      />
    );
  };

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

  const currentDataPost =
    selected !== "Select specialty"
      ? selected === "All"
        ? currentPosts
        : currentPosts.filter((item) => item.select_specialty === selected)
      : currentPosts;

  const handleSubmit = async (newRow) => {
    try {
      const newSetData = {
        setName: newRow.set_name,
        setId: newRow.set_id,
        setQuantity: newRow.set_quantity,
        setLocation: newRow.set_location,
        setSpecialty: newRow.select_specialty,
        setImage: newRow.set_image,
      };

      const response = await fetch(`${apiBaseUrl}/instrumentSets`, {
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

        setNewSetData({
          set_name: "",
          set_id: "",
          set_quantity: "",
          set_location: "",
          select_specialty: "",
          set_image: "",
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
    fetch(`${apiBaseUrl}/instrumentSets`)
      .then((response) => response.json())
      .then((data) => setSetData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const toggleEditMode = (rowId) => {
    if (editingRows.includes(rowId)) {
      setEditingRows(editingRows.filter((id) => id !== rowId));
    } else {
      const itemToEdit = setData.find((item) => item.id === rowId);
      setEditedData({
        ...editedData,
        [rowId]: { ...itemToEdit },
      });
      setEditingRows([...editingRows, rowId]);
    }
  };

  const handleDeleteClick = async (setId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this set?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`${apiBaseUrl}/instrumentSets/${setId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setSetData((prevData) =>
            prevData.filter((item) => item.id !== setId)
          );
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

  const updateSetOnServer = async (editedItem) => {
    try {
      const updatedData = {
        setName: editedItem.set_name,
        setId: editedItem.set_id,
        setQuantity: editedItem.set_quantity,
        setLocation: editedItem.set_location,
        setSpecialty: editedItem.select_specialty,
        setImage: editedItem.set_image,
      };

      const response = await fetch(
        `${apiBaseUrl}/instrumentSets/${editedItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Set updated successfully");
        return response.json();
      } else {
        console.error(
          "Error updating set:",
          response.status,
          response.statusText
        );
        const errorData = await response.json();
        console.error("Error data:", errorData);
        return null;
      }
    } catch (error) {
      console.error("Error updating set:", error);
      return null;
    }
  };

  const handleSave = async (setId) => {
    if (user?.role === "ADMIN") {
      const editedItem = editedData[setId];

      if (editedItem) {
        const response = await updateSetOnServer(editedItem);
        if (response) {
          console.log("Set updated successfully");
          setEditingRows(editingRows.filter((id) => id !== setId));
          fetchData();
          setIsEditing(false);
        } else {
          console.error("Error updating set:", response);
        }
      }
    }
  };

  const handleImageChange = (setId, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedData((prevData) => ({
        ...prevData,
        [setId]: {
          ...prevData[setId],
          set_image: reader.result,
        },
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div div className={styles.setsListPageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
          <Dropdown selected={selected} setSelected={handleDropdownSelect} />
        </div>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header.accessor}>{header.name}</th>
                ))}
                {canPerformActions && (
                  <>
                    <th>Edit</th>
                    <th>Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentDataPost.map((item) => (
                <tr key={item.id} onClick={handleSetClick(item)}>
                  {headers.map((header) => (
                    <td key={header.accessor}>
                      {header.accessor === "set_image" ? (
                        editingRows.includes(item.id) ? (
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(item.id, e)}
                          />
                        ) : (
                          renderImage(item[header.accessor])
                        )
                      ) : editingRows.includes(item.id) ? (
                        <input
                          type={header.inputType}
                          value={
                            editedData[item.id]
                              ? editedData[item.id][header.accessor]
                              : item[header.accessor]
                          }
                          onChange={(e) =>
                            handleEditFieldChange(
                              item.id,
                              header.accessor,
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        item[header.accessor]
                      )}
                    </td>
                  ))}
                  <td>
                    {canPerformActions ? (
                      editingRows.includes(item.id) ? (
                        <button
                          className={styles.saveButton}
                          onClick={() => handleSave(item.id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className={styles.editButton}
                          onClick={() => toggleEditMode(item.id)}
                        >
                          Edit
                        </button>
                      )
                    ) : null}
                  </td>
                  <td>
                    {canPerformActions ? (
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        Delete
                      </button>
                    ) : null}
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
              setSpecialty: newSetData.select_specialty,
              setImage: newSetData.set_image,
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
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={allPosts.length}
          paginate={handlePagination}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default SetsListPage;
