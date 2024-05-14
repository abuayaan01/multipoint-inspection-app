import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function RoofRoute({ toggleRefresh, roof, comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "condition-of-roof-covering",
    "flashing",
    "general",
    "plumbing-vents",
    "skylights",
    "style-of-roof",
    "valleys",
    "ventilation-system",
  ];

  useEffect(() => {
    setCurrentComponentName("Roof");
  }, []);

  return (
    <div>
      {roof?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  roof={items}
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

export default RoofRoute;
