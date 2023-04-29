import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  
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
            <a onClick={() => paginate(id)} href="#!" className="pageLink">
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
          Previous
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

