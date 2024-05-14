import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function PlumbingRoutes({ toggleRefresh, plumbing , comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "MainFuelShutOffLocation",
    "SanitaryGrinderPump",
    "WaterHeater1",
    "WaterHeater2",
    "WaterService",
    "WaterSoftener",
    "WellPump",
  ];

  useEffect(() => {
    setCurrentComponentName("Plumbing");
  }, []);
  return (
    <div>
      {plumbing?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component toggleRefresh={toggleRefresh} plumbingData={items} comments={comments} />
              }
            />
          ))}
        </Routes>
      ))}
    </div>
  );
}

export default PlumbingRoutes;
