import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function BasementRoutes({ toggleRefresh, basement, comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "Columns",
    "Drainage",
    "Floor",
    "Foundation",
    "GirdersBeams",
    "Joists",
    "SeismicBolts",
    "Stairs",
    "Subfloor",
  ];

  useEffect(() => {
    setCurrentComponentName("Basement");
  }, []);
  return (
    <div>
      {basement?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  basementData={items}
                  comments={comments}
                />
              }
            />
          ))}
        </Routes>
      ))}
    </div>
  );
}

export default BasementRoutes;
