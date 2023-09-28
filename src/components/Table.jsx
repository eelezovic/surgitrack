import React, { useState } from "react";
import styles from "./Table.module.css";
import { FaPen, FaTrash } from "react-icons/fa";
import ReactImageMagnify from "react-image-magnify";

function Table({
  data,
  headers,
  selectedSpecialty,
  editRow,
  handleDelete,
  canPerformActions,
  onRowClick,
}) {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleItemClick = (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  const filteredData =
    selectedSpecialty !== "Select specialty"
      ? selectedSpecialty === "All"
        ? data
        : data.filter((item) => item.select_specialty === selectedSpecialty)
      : data;

  return (
    <>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {headers.map(
                (header) =>
                  (header.accessor !== "set_action" || canPerformActions) && (
                    <th key={header.name}>{header.name}</th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                onClick={() => {
                  handleItemClick(item);
                  onRowClick(item);
                }}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              >
                {headers.map((header) => (
                  <td key={header.accessor}>
                    {header.accessor !== "set_action" ? (
                      item[header.accessor]
                    ) : (
                      <>
                        {hoveredItemId === item.id && canPerformActions && (
                          <>
                            <button
                              onClick={(event) => {
                                editRow(event, item);
                              }}
                              className={`${styles.iconButton} ${styles.edit}`}
                            >
                              <FaPen />
                            </button>

                            <button
                              onClick={(event) => handleDelete(event, item)}
                              className={`${styles.iconButton} ${styles.delete}`}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
