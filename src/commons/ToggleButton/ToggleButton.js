import React from 'react';
import "./ToggleButton.css"

function SwitchButton(props) {
    return (
        <div className="toggle-button">
            <button className="button-width">Limit Offset</button>
            <button className="button-width">Infinite</button>
        </div>
    );
}

export default SwitchButton;