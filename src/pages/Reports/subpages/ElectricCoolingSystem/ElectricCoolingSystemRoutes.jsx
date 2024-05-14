import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function ElectricCoolingSystemRoutes({ toggleRefresh, electricCoolingSystem , comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "EvaporatorCoilSectionUnit1",
    "EvaporatorCoilSectionUnit2",
    "MainPanel",
    "Subpanels",
  ];

  useEffect(() => {
    setCurrentComponentName("Electric Cooling System");
  }, []);
  return (
    <div>
      {electricCoolingSystem?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  electricCoolingSystemData={items}
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

export default ElectricCoolingSystemRoutes;
