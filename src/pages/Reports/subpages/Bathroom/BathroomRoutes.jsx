import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function BathroomRoutes({ toggleRefresh, bathroom, comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = ["Bath"];

  useEffect(() => {
    setCurrentComponentName("Bathroom");
  }, []);
  return (
    <div>
      {bathroom?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  bathroomData={items}
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

export default BathroomRoutes;
