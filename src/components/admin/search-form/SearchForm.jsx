import React from "react";
import "./search-form.css";

const SearchForm = ({onSearch}) => {
  return (
    <div className="search-form">
      <form>
        <input placeholder="Որոնել ․․․" onChange={(evn) => onSearch(evn.target.value)}/>
      </form>
    </div>
  );
};

export default SearchForm;
