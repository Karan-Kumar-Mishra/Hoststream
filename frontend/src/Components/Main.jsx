import StartPage from "./StartPage";
import Feedback from "./Feedback";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import DashBoard from "./DashBoard";
import Setting from "./Setting";
import SiteForm from "./SiteForm";
import ServicePage from "./ServicePage";

export default function Main() {
  return (
    <>
      <Router>
        <Suspense fallback={<h1>Loading..</h1>}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/Dashboard" element={<DashBoard />} />
            <Route path="/setting" element={<h1>setting</h1>} />
            <Route path="/servicePage" element={<ServicePage />} />
            <Route path="*" element={<h1>not found</h1>} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
