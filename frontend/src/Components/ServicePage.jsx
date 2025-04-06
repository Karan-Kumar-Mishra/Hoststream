import React, { useEffect } from "react";
import PowerButton from "./PowerButton";
import "../css/DeleteBtn.css";
import { useNavigate } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { delete_site } from "../Redux/Actions/DeleteSite";
export default function ServicePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const store_data = useSelector((state) => state.Data);
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  useEffect(() => {
    console.log("state=>",store_data);
    
    if (isLoaded) {
      console.log("user => ", user);
      if (isSignedIn) {
        console.log("User is logged in");
      } else {
        console.log("User is not logged in");
        navigate("/");
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);
  function deleteing_site(id) {
    Dispatch(delete_site(id));
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-screen flex items-center flex-col overflow-y-scroll p-4">
      <div className="bg-transparent w-full max-w-6xl flex flex-col gap-5 md:flex-row justify-between items-center p-6">
        <div className="name text-white text-center md:text-left">
          <h1 className="text-4xl font-bold">
            {store_data.UserInfo.other_info.crsrpgif.site_name}
          </h1>
          <p className="text-lg">
            {store_data.UserInfo.other_info.crsrpgif.id}
          </p>
        </div>
        {/* <PowerButton /> */}
      </div>

      <div className="site-preview bg-transparent w-full max-w-6xl flex flex-col md:flex-row justify-center items-center shadow-2xl shadow-gray-300 rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="h-64 md:h-96 w-full md:w-1/2 flex items-center justify-center shadow-2xl shadow-blue-400">
          <iframe
            src={store_data.UserInfo.other_info.crsrpgif.URL}
            title="website example"
            className="h-full w-full bg-white overflow-hidden"
            style={{ border: "none" }}
          />
        </div>

        {/* Right Section */}
        <div className="h-64 md:h-96 w-full md:w-1/2 flex items-center justify-between text-white text-2xl font-bold flex-col p-20">
          <h1>Date</h1>
          <p className="text-cyan-300">
            {store_data.UserInfo.other_info.crsrpgif.Date}
          </p>
          <a
            href={store_data.UserInfo.other_info.crsrpgif.URL}
            target="_blanck"
          >
            {store_data.UserInfo.other_info.crsrpgif.URL}
          </a>
          <button
            onClick={() => {
              deleteing_site(store_data.UserInfo.other_info.crsrpgif.id);
            }}
            className="ui-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
