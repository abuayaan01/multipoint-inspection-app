import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Home from "./Home";
import Administration from "../Administration/Administration";
import Settings from "../Settings/Settings";
import Report from "../Reports/Report";
import Reports from "../Reports/Reports";
import Transition from "../../components/Transition";
import { AnimatePresence } from "framer-motion";
import InspectionCalendar from "../../components/Calendar";
import Help from "./../../components/Help";

function DashboradRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const location = useLocation();
  const ErrorPage = () => {
    const styles = {
      errorContainer: {},
      text: {
        textTransform: "uppercase",
        background: "linear-gradient(to right, #faab3b 0%, #330867 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "20vw",
      },
    };
    return (
      <>
        <div
          style={styles.errorContainer}
          className="flex justify-center items-center h-full"
        >
          <h1 style={styles.text} className="error-text">
            404
          </h1>
        </div>
      </>
    );
  };

  return (
    <div className="app-body flex">
      <div className="sidebar w-[230px] hidden md:block fixed">
        <div className="sidebarContainer absolute top-0 w-full h-[100vh]">
          <Sidebar />
        </div>
      </div>

      <div className="mainContainer w-full max-h-[100vh] overflow-hidden overflow-y-scroll md:ml-[230px] md:px-8 px-2 py-8 bg-[#f4f4f4]">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            {/* <Route path="/" element={<Home />}></Route>
              <Route path='settings' Component={Settings}></Route>
              <Route path='reports' Component={Reports}></Route>
              <Route path='report/:id/*' Component={Report}></Route>
              <Route path='/*' Component={ErrorPage} ></Route> */}
            <Route
              path="/"
              element={
                <Transition uid="dashboard">
                  <Home />
                </Transition>
              }
            ></Route>
            <Route
              path="administration"
              element={
                <Transition uid="dashboard">
                  <Administration />
                </Transition>
              }
            ></Route>
            <Route
              path="schedules"
              element={
                <Transition uid="dashboard">
                  <div className="mt-10">
                    <InspectionCalendar height={"600px"} />
                  </div>
                </Transition>
              }
            ></Route>
            <Route
              path="settings"
              element={
                <Transition uid="settings">
                  <Settings />
                </Transition>
              }
            ></Route>
            <Route
              path="reports"
              element={
                <Transition uid="reports">
                  <Reports />
                </Transition>
              }
            ></Route>
            <Route
              path="report/:id/*"
              element={
                <Transition uid="report">
                  <Report />
                </Transition>
              }
            ></Route>
            <Route
              path="/help"
              element={
                <Transition>
                  <Help />
                </Transition>
              }
            ></Route>
            <Route
              path="/*"
              element={
                <Transition>
                  <ErrorPage uid="error" />
                </Transition>
              }
            ></Route>
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DashboradRoute;
