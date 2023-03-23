import React,{useState} from "react"; 
import styles from "../pages/SingleInstrumentsComponent.module.css";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { SingleInstrumentsData } from "../components/dataStorage/SingleInstrumentsData";
import Pagination from "../components/Pagination";


function SingleInstrumentsComponent() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = SingleInstrumentsData.slice(indexOfFirstPost, indexOfLastPost);
  const keys = ["instrument_name", "instrument_id", "instrument_location"]
  const getDataWithSearchString = (data) => {
    return data.filter(
      (item) => 
      keys.some(key => item[key].toUpperCase().includes(query.toUpperCase()))
    );
  }

  // To change pages
  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <div className="singleInstrumentContainer">
      <div className="SearchBarContainer">
        <Table data={getDataWithSearchString(currentPosts)} query={query} /> 
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