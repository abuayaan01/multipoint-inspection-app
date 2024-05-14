import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from './Subpages'
import { useComponent } from "../../../../Context/ComponentContext";

function HeatingSystemRoutes({ toggleRefresh, heatingSystem , comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "BoilerSystem",
    "HeatingSystem",
    "OtherSystem",
  ];

    useEffect(() => {
      setCurrentComponentName("Heating System");
      console.log(heatingSystem)
    }, [heatingSystem]);

  return (
    <div>
      {heatingSystem?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                
                <Component
                toggleRefresh={toggleRefresh}
                heatingSystemData={items}
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

export default HeatingSystemRoutes