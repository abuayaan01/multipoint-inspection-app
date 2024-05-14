import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./Subpages/BedRoom";
import { useComponent } from "../../../../Context/ComponentContext";

function BedRoomRoutes({ toggleRefresh, bedroom, comments }) {

  const { setCurrentComponentName } = useComponent();
  const subUrls = ["bedroom"];

  useEffect(() => {
    setCurrentComponentName("Bedroom");
  }, []);
  return (
    <div>
      {bedroom?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  BedRoomData={items}
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

export default BedRoomRoutes;
