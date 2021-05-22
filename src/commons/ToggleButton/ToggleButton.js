import "./ToggleButton.css";

function SwitchButton(props) {
  const {paginationActive, toggleView} = props;
  return (
    <div className="toggle-button">
      <button
        className="button-width"
        style={{
          backgroundColor: paginationActive ? "#02a6ff" : "#fff",
          color: paginationActive ? "white" : "black",
        }}
        onClick={toggleView}
      >
        <span className="nav-text">Limit Offset</span>
      </button>
      <button
        className="button-width"
        style={{
          backgroundColor: paginationActive ? "#fff" : "#02a6ff",
          color: paginationActive ? "black" : "white",
        }}
        onClick = {toggleView}
      >
        <span className="nav-text-infinite">Infinite</span>
      </button>
    </div>
  );
}

export default SwitchButton;
