import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function ExteriorRoute({ toggleRefresh, exterior, comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "Building(s) Exterior wall construction",
    "Caulking",
    "Chimney(s)",
    "Exterior AC Heat Pumps",
    "Exterior doors",
    "Fascia",
    "Flashing",
    "Gutters/Scuppers/Eavestrough",
    "Service Entry",
    "Siding",
    "Slab on Grade/Foundation",
    "Soffit",
    "Stroms/Windows",
    "Trim",
    "Windows/Screens",
  ];
  useEffect(() => {
    setCurrentComponentName("Exterior");
  }, []);

  return (
    <div>
      {exterior?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  exterior={items}
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

export default ExteriorRoute;
