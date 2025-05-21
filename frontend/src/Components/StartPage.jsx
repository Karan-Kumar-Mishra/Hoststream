import React from "react";
import "../css/StartPage.css";
import { SignIn } from "@clerk/clerk-react";

export default function StartPageBackground() {
  return (
    <div className="flex flex-col md:flex-row gap-5 p-2 md:p-4 w-full ">
      <div className="flex justify-center items-center p-4 md:p-10 w-full md:w-auto">
        <button className="btn w-full md:w-auto px-6 py-3 text-base md:text-lg">
          Hoststream
        </button>
      </div>
      <div className="w-full md:w-auto flex justify-center">
        <SignIn
          afterSignInUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full md:w-[400px]",
              card: "p-2 md:p-4 w-full",
              formButtonPrimary:
                "h-10 bg-blue-500 hover:bg-blue-600 text-sm px-4",
            },
          }}
        />
      </div>
    </div>
  );
}