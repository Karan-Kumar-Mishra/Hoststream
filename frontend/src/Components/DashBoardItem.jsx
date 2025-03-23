import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_list_static_site } from "../Redux/Actions/GetListStaticSite";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { nanoid } from "nanoid";
import { set_crspgif } from "../Redux/Actions/SetCrsrpgif.js";
export default function DashBoardItem() {
  const [sites_item, setsites_item] = useState([]);
  const nevigate = useNavigate();
  const Dispatch = useDispatch();
  const store_data = useSelector((state) => state.Data);
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function setupservicepage(params) {
    Dispatch(set_crspgif(params));
    nevigate("/servicePage");
  }
  React.useEffect(() => {
    Dispatch(get_list_static_site());
    setsites_item(store_data.UserInfo.services.static_site);
  }, [
    store_data.UserInfo.services.static_site,
    get_list_static_site,
    dispatch,
    isLoaded,
    isSignedIn,
    user,
    navigate,
    store_data.UserInfo.user.id,
    setsites_item,
    sites_item,

  ]);
  return (
    <div className="settings-container">
      <div className="spotlight"></div>
      <div className="settings-box">
        <div className="settings-list flex-wrap">
          {sites_item?.map((item) => (
            <div
              key={nanoid()}
              className="setting-item font-extrabold  "
              onClick={() => {
                setupservicepage(item);
              }}
            >
              <span>{item.website_name}</span>
              <a herf={item.URL}>{item.URL}</a>
              <div className="option-button">...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
