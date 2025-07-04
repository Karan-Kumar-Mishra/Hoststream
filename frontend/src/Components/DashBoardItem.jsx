import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_list_static_site } from "../Redux/Actions/GetListStaticSite";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { nanoid } from "nanoid";
import { set_crspgif } from "../Redux/Actions/SetCrsrpgif.js";
import { get_ec2s } from "../Redux/Actions/GetVms.js";
import { set_crvmpgif } from "../Redux/Actions/Setcrvmpif.js";

export default function DashBoardItem() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store_data = useSelector((state) => state.Data);


  const static_sites = useSelector((state) =>
    state.Data?.UserInfo?.services?.static_site || []
  );
  const vms = useSelector((state) =>
    state.Data?.UserInfo?.services?.vms || []
  );

  const { isLoaded, isSignedIn, user } = useUser();

  function setupservicepage(params) {
    dispatch(set_crspgif(params));
    navigate("/servicePage");
  }
  function setupvmpage(params) {
    navigate("/vmpage");
    dispatch(set_crvmpgif(params));
  }

  useEffect(() => {
    if (isLoaded && isSignedIn && initialLoad) {

      setLoading(true);
      setError(null);

      dispatch(get_list_static_site())
        .then(() => {

          setInitialLoad(false);
          setLoading(false);
          dispatch(get_ec2s());
        })
        .catch((err) => {

          setError("Failed to load sites. Please try again.");
          setLoading(false);
        });
      console.log("arr vm=>", vms);

    }
  }, [dispatch, vms, isLoaded, isSignedIn, initialLoad, store_data?.UserInfo?.services?.static_site]);

  if (!isLoaded) {
    return <div>Loading authentication...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  if (loading) {
    return (
      <div className="settings-container">
        <div className="settings-box">
          <div>Loading your sites...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="settings-container">
        <div className="settings-box">
          <div className="text-red-500">{error}</div>
          <button
            onClick={() => {
              setInitialLoad(true);
              setLoading(true);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="spotlight"></div>
      <div className="settings-box">
        {(static_sites?.length > 0 || vms.length > 0) ? (
          <div className="settings-list flex-wrap">
            {static_sites.map((item) => (
              <div
                key={nanoid()}
                className="setting-item font-extrabold"
                onClick={() => setupservicepage(item)}
              >
                {console.log("web items ", item)}
                <span>{item.website_name}</span>
                <a href={item.URL} target="_blank" rel="noopener noreferrer">
                  {item.URL}
                </a>
                <div className="option-button">...</div>
              </div>
            ))}

            {vms.map((item) => (
              <div
                key={nanoid()}
                className="setting-item font-extrabold"
                onClick={() => setupvmpage(item)}
              >
                {console.log("vm items ", item)}
                <span>{item.vm_name}</span>
                <a href={item.URL} target="_blank" rel="noopener noreferrer">
                  {item.vm_name}
                </a>
                <div className="option-button">...</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No sites found</p>
            <button
              onClick={() => {
                setInitialLoad(true);
                setLoading(true);
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}