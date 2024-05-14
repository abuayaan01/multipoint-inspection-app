import React, { useEffect} from "react";
import { Routes, Route} from "react-router-dom";
import ServiceWalks from "./subpages/ServiceWalks";
import DrivewayParking from "./subpages/DrivewayParking";
import StoopsSteps from "./subpages/StoopsSteps";
import Porch from "./subpages/Porch";
import Patio from "./subpages/Patio";
import DeckBalcony from "./subpages/DeckBalcony";
import DeckPatioPorchCovers from "./subpages/DeckPatioPorchCovers";
import FenceWall from "./subpages/FenceWall";
import LandscapingFoundation from "./subpages/LandscapingFoundation";
import RetainingWall from "./subpages/RetainingWall";
import HoseBibs from "./subpages/HoseBibs";
import { useComponent } from "../../../../Context/ComponentContext";

function GroundRoute({ toggleRefresh, ground }) {
  const { setCurrentComponentName } = useComponent();
  useEffect(() => {
    setCurrentComponentName("Ground");
  }, []);
  return (
    <>
      <div>
        {ground?.map((items, index) => (
          <Routes>
            
            <Route
              path={`/${index + 1}/service-walks`}
              element={
                <ServiceWalks
                  toggleRefresh={toggleRefresh}
                  groundData={items}
                />
              }
            />
            <Route
              path={`/${index + 1}/driveway-parking`}
              element={
                <DrivewayParking
                  toggleRefresh={toggleRefresh}
                  groundData={items}
                />
              }
            />
            <Route
              path={`/${index + 1}/porch`}
              element={
                <Porch toggleRefresh={toggleRefresh} groundData={items} />
              }
            />
            <Route
              path={`/${index + 1}/stoops-steps`}
              element={
                <StoopsSteps toggleRefresh={toggleRefresh} groundData={items} />
              }
            />
            <Route
              path={`/${index + 1}/patio`}
              element={
                <Patio toggleRefresh={toggleRefresh} groundData={items} />
              }
            />
            <Route
              path={`/${index + 1}/deck-balcony`}
              element={
                <DeckBalcony toggleRefresh={toggleRefresh} groundData={items} />
              }
            />
            <Route
              path={`/${index + 1}/deck-patio-porch-covers`}
              element={
                <DeckPatioPorchCovers
                  toggleRefresh={toggleRefresh}
                  groundData={items}
                />
              }
            />
            <Route
              path={`/${index + 1}/fence-wall`}
              element={
                <FenceWall toggleRefresh={toggleRefresh} groundData={items} />
              }
            />
            <Route
            path={`/${index + 1}/landscaping-foundation`}
              element={
                <LandscapingFoundation
                  toggleRefresh={toggleRefresh}
                  groundData={items}
                />
              }
            />
            <Route
              path={`/${index + 1}/retaining-wall`}
              element={
                <RetainingWall
                  toggleRefresh={toggleRefresh}
                  groundData={items}
                />
              }
            />
            <Route
              path={`/${index + 1}/hose-bibs`}
              element={
                <HoseBibs toggleRefresh={toggleRefresh} groundData={items} />
              }
            />
          </Routes>
        ))}
      </div>
    </>
  );
}

export default GroundRoute;
