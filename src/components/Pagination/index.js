import React, { useState } from "react";
import { checkRange } from "../../utils/checkRange";
import "./Pagination.css"

function Pagination(props) {
  const { activePage, pageCount, goToPage } = props;
  const [goToVal, setGoToVal] = useState(null);
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    const active = i === activePage;
    pages.push(<span onClick={() => { goToPage(i) }} className={active ? 'active' : ''}>{i + 1}</span>);
  }
  return (
    <div class="pagination">
      {pages}
      <span>
        <span>Go to page</span>
        <span>
          <input
            onChange={(e) => {
              const val = e.target.value;
              if (checkRange(1, pageCount, val)) {
                setGoToVal(val);
              }
            }}
            type='number'
            min={1}
            max={pageCount}
          />
        </span>
        <button onClick={() => { checkRange(1, pageCount, goToVal) && goToPage(goToVal - 1) }} className="go-to-button">Go</button>
      </span>
    </div>
  );
}

export default Pagination;