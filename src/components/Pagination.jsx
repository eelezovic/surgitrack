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

  const renderPageNumbers = () => {
    const visiblePageNumbers = 3;
    const totalPageNumbers = pageNumbers.length;

    if (totalPageNumbers <= visiblePageNumbers) {
      // Display all page numbers if there are less than or equal to 4 pages
      return pageNumbers.map((id) => renderPageLink(id));
    } else {
      // Display first 4 pages, ellipsis, and last 4 pages
      const firstPages = pageNumbers.slice(0, visiblePageNumbers);
      const lastPages = pageNumbers.slice(-visiblePageNumbers);

      return [
        ...firstPages.map((id) => renderPageLink(id)),
        <li key="ellipsisFirst" className={styles.pageItemEllipsis}>
          ...
        </li>,
        ...lastPages.map((id) => renderPageLink(id)),
      ];
    }
  };

  const renderPageLink = (id) => (
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
  );


  return (
    <div className={styles.paginationContainer}>
    <ul className={styles.pagination}>
      {renderPageNumbers()}
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


