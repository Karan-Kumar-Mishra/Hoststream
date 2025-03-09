import React, { useEffect } from "react";
import PowerButton from "./PowerButton";
import "../css/DeleteBtn.css";
import { useNavigate } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export default function ServicePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
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
  return (
    <div className="h-screen w-screen flex items-center flex-col overflow-y-scroll p-4">
      <div className="bg-transparent w-full max-w-6xl flex flex-col gap-5 md:flex-row justify-between items-center p-6">
        <div className="name text-white text-center md:text-left">
          <h1 className="text-4xl font-bold">Karan Kumar Mishra</h1>
          <p className="text-lg">https://www.youtube.com</p>
        </div>
        <PowerButton />
      </div>

      <div className="site-preview bg-transparent w-full max-w-6xl flex flex-col md:flex-row justify-center items-center shadow-2xl shadow-gray-300 rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="h-64 md:h-96 w-full md:w-1/2 flex items-center justify-center">
          <iframe
            src="https://karan-kumar-mishra.github.io/Portfolio/"
            title="Example iframe"
            className="h-full w-full "
            style={{ border: "none" }}
          />
        </div>

        {/* Right Section */}
        <div className="h-64 md:h-96 w-full md:w-1/2 flex items-center justify-between text-white text-2xl font-bold flex-col p-20">
          <h1>Date</h1>
          <h1>https://www.google.com</h1>
          <button class="ui-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}
