import React, { useState } from "react";
import { checkRange } from "../../utils/checkRange";
import "./Pagination.css"

function Pagination(props) {
  const { activePage, pageCount, goToPage } = props;
  const [goToVal, setGoToVal] = useState(null);
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    const active = i === activePage;
    pages.push(<a onClick={() => { goToPage(i) }} className={active ? 'active' : ''}>{i + 1}</a>);
  }
  return (
    <div class="pagination">
      {pages}
      <span className="go-to-wrapper">
        <span className="go-to-label">Go to page</span>
        <span  className="go-to-input">
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
