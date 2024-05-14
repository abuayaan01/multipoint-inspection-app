import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function InteriorRoutes({ toggleRefresh, interior , comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "AtticStructureFamingInsulation",
    "Fireplace",
    "SmokeCarbonMonoxideDetectors",
    "StairsStepsBalconies",
  ];

  useEffect(() => {
    setCurrentComponentName("Interior");
  }, []);
  return (
    <div>
      {interior?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  interiorData={items}
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

export default InteriorRoutes;
