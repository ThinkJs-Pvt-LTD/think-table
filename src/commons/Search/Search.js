import React, { useState } from "react";
import "./Search.css"

function SearchBar(props) {
  const [keyword, setKeyword] = useState("");
  const handleInpurChange = (e) => {
    setKeyword(e.target.value)
    props.onChange(e.target.value)
  }
  return (
    <div class="wrap">
      <div class="search">
        <input
          type="text"
          class="searchTerm"
          id="input_text"
          placeholder="Search"
          onChange={(e) => handleInpurChange(e)}
          value={keyword}
        ></input>
        <button type="submit" class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
