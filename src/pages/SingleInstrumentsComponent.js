import React,{useState} from "react"; 
import styles from "../pages/SingleInstrumentsComponent.module.css";
import SearchBar from "../components/SearchBar";
import Table from "./Table";
import { SingleInstrumentsData } from "./dataStorage/SingleInstrumentsData";
import Pagination from "./Pagination";


function SingleInstrumentsComponent() {
   
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = SingleInstrumentsData.slice(indexOfFirstPost, indexOfLastPost);

  // To change pages
  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <div className="singleInstrumentContainer">
      <div className="SearchBarContainer">
        <Table data={search(currentPosts)} /> 
        <Pagination
          postsPerPage={postsPerPage} 
          totalPosts={SingleInstrumentsData.length} 
          paginate={paginate} />
        <SearchBar setQuery={setQuery} />
      </div>
    </div>
  );
}

export default SingleInstrumentsComponent;