import React, { useState } from "react";
import "./Search.css"

function SearchBar({onChange}) {
  const [keyword, setKeyword] = useState("");
  const handleInputChange = (key) => {
    setKeyword(key);
    onChange(key);
  }
  return (
    <div class="wrap">
      <div class="search">
        <input
          type="text"
          class="searchTerm"
          id="input_text"
          placeholder="Search"
          onChange={(e) => handleInputChange(e.target.value)}
          value={keyword}
        />
        <button type="submit" class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
