import React, { useState } from "react";
import "./ToggleButton.css";

function SwitchButton(props) {
    //State
  const [limited, setLimited] = useState(true);

  //Function
  const limitedTable =() => {
    setLimited(true)
  }
  const infiniteTable =() => {
      setLimited(false)
  }
  return (
    <div className="toggle-button">
      <button
        className="button-width"
        style={{
          backgroundColor: limited ? "#02a6ff" : "#fff",
          color: limited ? "white" : "black",
        }}
        onClick={limitedTable}
      >
        <span className="nav-text">Limit Offset</span>
      </button>
      <button
        className="button-width"
        style={{
          backgroundColor: limited ? "#fff" : "#02a6ff",
          color: limited ? "black" : "white",
        }}
        onClick = {infiniteTable}
      >
        <span className="nav-text-infinite">Infinite</span>
      </button>
    </div>
  );
}

export default SwitchButton;
