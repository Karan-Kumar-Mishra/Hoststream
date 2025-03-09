import React from "react";
import { useNavigate } from "react-router-dom";
export default function DashBoardItem() {
  const itmes = [
    {
      id: 1,
      site_name: "Website1.com",
      buttonLabel: "Edit",
      URL: "https://www.gooele.com",
      Date: Date.now(),
    },
    {
      id: 2,
      site_name: "Theme",
      buttonLabel: "Change",
      URL: "https://www.gooele.com",
      Date: Date.now(),
    },
    {
      id: 3,
      site_name: "Notifications",
      buttonLabel: "Configure",
      URL: "https://www.gooele.com",
      Date: Date.now(),
    },
    {
      id: 4,
      site_name: "Language",
      buttonLabel: "Select",
      URL: "https://www.gooele.com",
      Date: Date.now(),
    },
    {
      id: 5,
      site_name: "Privacy",
      buttonLabel: "Manage",
      URL: "https://www.gooele.com",
      Date: Date.now(),
    },
    {
      id: 6,
      site_name: "Security",
      buttonLabel: "Update",
      URL: "https://www.gooele.com",
      Date: Date.now(),
    },
  ];
  const nevigate = useNavigate();
  return (
    <div className="settings-container">
      <div className="spotlight"></div>
      <div className="settings-box">
        <div
          className="settings-list"
          onClick={() => {
            nevigate("/servicePage");
          }}
        >
          {itmes.map((item) => (
            <div
              key={item.id}
              className="setting-item font-extrabold  "
            >
              <span>{item.site_name}</span>
              <a herf={item.URL}>{item.URL}</a>
              <div className="option-button">...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
