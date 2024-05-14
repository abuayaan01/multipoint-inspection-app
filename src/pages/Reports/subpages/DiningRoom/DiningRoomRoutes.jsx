import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function DiningRoomRoutes({ toggleRefresh, diningRoom , comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "DiningRoom"
  ];

  useEffect(() => {
    setCurrentComponentName("Dining Room");
  }, []);
  return (
    <div>
      {diningRoom?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  diningRoomData={items}
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

export default DiningRoomRoutes;
