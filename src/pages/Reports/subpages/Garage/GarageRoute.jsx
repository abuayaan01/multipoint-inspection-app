import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function GarageRoute({ toggleRefresh, garage, comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "Automatic Opener",
    "Electrical Receptacles",
    "Exterior Service Door",
    "Fire Separation Wall And Ceilling",
    "Floor",
    "Gutters/Eavestrough",
    "Overhead Door(s)",
    "Roofing",
    "Safety Reverse",
    "Siding",
    "Sill Plates",
    "Trim",
    "Type",
  ];

  useEffect(() => {
    setCurrentComponentName("Garage");
  }, []);

  return (
    <div>
      {garage?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  garageData={items}
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

export default GarageRoute;
