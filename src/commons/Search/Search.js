import "./Search.css"

function SearchBar({filterKey,onChange}) {
  return (
    <div class="wrap">
      <div class="search">
        <input
          type="text"
          class="searchTerm"
          id="input_text"
          placeholder="Search"
          onChange={(e) => onChange(e.target.value)}
          value={filterKey}
        />
        <button class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
