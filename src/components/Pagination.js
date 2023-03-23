import React from "react"
import styles from "./Pagination.module.css";


const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);

   
  }
  return (
    <div className="paginationContainer">
      <ul className="pagination">
        {pageNumbers.map(id => (
          <li key={id} className="pageItem">
          <a onClick={() => paginate(id)} href="#!" className="pageLink">
            {id}
          </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination;