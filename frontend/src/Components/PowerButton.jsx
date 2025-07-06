import React, { useEffect } from "react";
import "../css/PowerButton.css";
import { useDispatch, useSelector } from "react-redux";
import { stop_vm } from "../Redux/Actions/Stopvm";
import { start_vm } from "../Redux/Actions/start_vm";
import { useNavigate } from "react-router-dom";
export default function PowerButton(props) {
  const store_data = useSelector((state) => state.Data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (store_data.UserInfo.other_info.crvmsrpgif.vm_state === 'on') {
      document.getElementById('toggle').checked = true; //mark on the power button
    }
    else {
      document.getElementById('toggle').checked = false; //mark off the power button
    }
  }, [store_data.UserInfo.other_info.crvmsrpgif.vm_state])

  function handleToggle(params) {
    const checkbox = document.getElementById('toggle');

    checkbox.addEventListener('change', function () {
      if (this.checked) {
        props.alertfunction("we are try to start your cluster wait...");
        console.log('Checkbox was checked (ON)');
        dispatch(start_vm(store_data.UserInfo.other_info.crvmsrpgif.vm_id))
        
      } else {
        props.alertfunction("we are try to stop your cluster wait...");
        console.log('Checkbox was unchecked (OFF)');
        dispatch(stop_vm(store_data.UserInfo.other_info.crvmsrpgif.vm_id))
        document.getElementById('toggle').checked = false;
       // props.closealert();
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
