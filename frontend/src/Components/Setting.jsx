import React from "react";
import "../css/Setting.css";
import { UserButton } from "@clerk/clerk-react";

export default function Setting() {
  const settingsOptions = [
    { id: 1, label: "Profile", buttonLabel: "Edit" },
    { id: 2, label: "Theme", buttonLabel: "Change" },
    { id: 3, label: "Notifications", buttonLabel: "Configure" },
    { id: 4, label: "Language", buttonLabel: "Select" },
    { id: 5, label: "Privacy", buttonLabel: "Manage" },
    { id: 6, label: "Security", buttonLabel: "Update" },
  ];
  return (
    <div className="settings-container">
      <div className="spotlight"></div>
      <div className="settings-box">
        <div className="settings-list">
          {settingsOptions.map((option) => (
            <div key={option.id} className="setting-item">
              <span>{option.label}</span>
              <button
                className="option-button"
                onClick={() => alert(`${option.label} option clicked!`)}
              >
                {option.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      
      </div>
    </div>
  );
}
