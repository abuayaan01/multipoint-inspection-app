import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function LivingRoomRoutes({ toggleRefresh, livingRoom , comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = ["LivingRoom"];

  useEffect(() => {
    setCurrentComponentName("Living Room");
  }, []);
  return (
    <div>
      {livingRoom?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  livingRoomData={items}
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

export default LivingRoomRoutes;
