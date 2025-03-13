import React from "react";
import { useNavigate } from "react-router-dom";
export default function DashBoardItem() {
  const itmes = [
    {
      id: 1,
      site_name: "Websitename",
      buttonLabel: "Edit",
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
          className="settings-list flex-wrap"
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
