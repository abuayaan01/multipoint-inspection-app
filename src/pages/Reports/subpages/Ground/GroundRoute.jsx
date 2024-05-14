import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function GroundRoute({ toggleRefresh, ground, comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "deck-balcony",
    "deck-patio-porch-covers",
    "driveway-parking",
    "fence-wall",
    "hose-bibs",
    "landscaping-foundation",
    "patio",
    "porch",
    "retaining-wall",
    "service-walks",
    "stoops-steps",
  ];

  useEffect(() => {
    setCurrentComponentName("Ground");
  }, []);

  return (
    <div>
      {ground?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  groundData={items}
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

export default GroundRoute;
