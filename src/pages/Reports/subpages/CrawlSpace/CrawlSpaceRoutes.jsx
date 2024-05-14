import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as subpages from "./subpages";
import { useComponent } from "../../../../Context/ComponentContext";

function CrawlSpaceRoutes({ toggleRefresh, crawlSpace, comments }) {
  const { setCurrentComponentName } = useComponent();
  const subUrls = [
    "Access",
    "CrawlSpace",
    "Drainage",
    "Floor",
    "FoundationWalls",
    "GirdersBeamsColumns",
    "Insulation",
    "Joists",
    "SeismicBolts",
    "Subfloor",
    "VaporBarrier",
    "Ventilation",
  ];

  useEffect(() => {
    setCurrentComponentName("Crawl Space");
  }, []);
  return (
    <div>
      {crawlSpace?.map((items, index) => (
        <Routes key={index}>
          {Object.entries(subpages).map(([name, Component], index3) => (
            <Route
              key={name}
              path={`/${index + 1}/${subUrls[index3]}`}
              element={
                <Component
                  toggleRefresh={toggleRefresh}
                  crawlSpaceData={items}
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

export default CrawlSpaceRoutes;
