import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePaginationClick = (event, id) => {
    event.preventDefault();
    paginate(id);
  };

  return (
    <div className={styles.paginationContainer}>
      <ul className={styles.pagination}>
        {pageNumbers.map((id) => (
          <li
            key={id}
            className={`${styles.pageItem} ${
              currentPage === id ? styles.active : ""
            }`}
          >
            <a
              href="/"
              onClick={(event) => handlePaginationClick(event, id)}
              className="pageLink"
            >
              {id}
            </a>
          </li>
        ))}
      </ul>
      {currentPage > 1 && (
        <button
          className={styles.paginationButtons}
          onClick={() => paginate(currentPage - 1)}
        >
          Prev
        </button>
      )}
      {currentPage < pageNumbers.length && (
        <button
          className={styles.paginationButtons}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;


