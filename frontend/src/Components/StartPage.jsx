import React from "react";
import "../css/StartPage.css";
import { SignIn } from "@clerk/clerk-react";
export default function StartPageBackground() {
  return (
    <div  >
      <svg viewBox="0 0 1000 1000" className="loader">
        {Array.from({ length: 21 }, (_, i) => (
          <polygon
            key={i}
            points="500,200 759,650 241,650"
            style={{ "--i": i }}
            className="poly"
          ></polygon>
        ))}
      </svg>
      <SignIn
        afterSignInUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "w-10",
            card: "p-4",
            formButtonPrimary:
              "h-10 bg-blue-500 hover:bg-blue-600 text-sm px-4", 
          },
        }}
      />
    </div>
  );
}
