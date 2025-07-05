import React, { useEffect } from "react";
import "../css/PowerButton.css";
export default function PowerButton(props) {
  useEffect(() => {
    document.getElementById('toggle').checked = true; //mark one the power button
  }, [])

  function handleToggle(params) {
    const checkbox = document.getElementById('toggle');

    checkbox.addEventListener('change', function () {
      if (this.checked) {
        console.log('Checkbox was checked (ON)');
        props.alertfunction("we are try to start your cluster wait...");
      } else {
        console.log('Checkbox was unchecked (OFF)');
        props.alertfunction("we are try to stop your cluster wait...");
      }
    });
  }
  return (

    <div className="switch">
      <input onChange={handleToggle} id="toggle" type="checkbox" />
      <label className="toggle" htmlFor="toggle">
        <i></i>
      </label>
    </div>

  );
}
