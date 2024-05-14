import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function KitchenRoutes({ toggleRefresh, kitchen, comments  }) {
    const { setCurrentComponentName } = useComponent();
    const subUrls = [
      "Appliance",
      "Cabinets",
      "Countertops",
      "Floor",
      "HeatingCoolingSource",
      "Plumbing",
      "WallsAndCeilling",
    ];
  
    useEffect(() => {
      setCurrentComponentName("Kitchen");
    }, []);
  return (
    <div>
      {kitchen?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  kitchenData={items}
                  comments={comments}
                />
              }
            />
          ))}
        </Routes>
      ))}
    </div>
  )
}

export default KitchenRoutes