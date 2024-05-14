import React, { useEffect, useState } from "react";
import { useParams, useLocation, Routes, Route } from "react-router-dom";
import { ComponentProvider } from "../../Context/ComponentContext";
import GeneralDetails from "./subpages/General/GeneralDetails";
import PropertyDetails from "./subpages/PropertyDetails/PropertyDetails";
import RelatedContacts from "./subpages/RelatedContacts/RelatedContacts";
import Invoice from "./subpages/Invoice/Invoice";
import Summary from "./subpages/Summary/Summary";
import Overview from "./subpages/Overview/Overview";
import GroundRoute from "./subpages/Ground/GroundRoute";
import ReportNavbar from "../../components/ReportNavbar";
import ReportNavigationDrawer from "../../components/ReportNavigationDrawer";
import PDFConverter from "../../components/PDFConverter";
import {
  getInspectionReq,
  getCommentsReq,
  getPdfDataReq,
} from "../../services/api";
import RoofRoute from "./subpages/Roof/RoofRoute";
import ExteriorRoute from "./subpages/Exterior/ExteriorRoute";
import GarageRoute from "./subpages/Garage/GarageRoute";
import BasementRoutes from "./subpages/Basement/BasementRoutes";
import BathroomRoutes from "./subpages/Bathroom/BathroomRoutes";
import CrawlSpaceRoutes from "./subpages/CrawlSpace/CrawlSpaceRoutes";
import DiningRoomRoutes from "./subpages/DiningRoom/DiningRoomRoutes";
import ElectricCoolingSystemRoutes from "./subpages/ElectricCoolingSystem/ElectricCoolingSystemRoutes";
import HeatingSystemRoutes from "./subpages/HeatingSystem/HeatingSystemRoutes";
import InteriorRoutes from "./subpages/Interior/InteriorRoutes";
import KitchenRoutes from "./subpages/Kitchen/KitchenRoutes";
import LaundryRoomRoutes from "./subpages/LaundryRoom/LaundryRoomRoutes";
import LivingRoomRoutes from "./subpages/LivingRoom/LivingRoomRoutes";
import PlumbingRoutes from "./subpages/Plumbing/PlumbingRoutes";
import BedRoomRoutes from "./subpages/Bedroom/BedRoomRoutes";


function Report() {
  const { id } = useParams();
  const location = useLocation();
  const [inspectionData, setInspectionData] = useState({});
  const [general, setGeneral] = useState({});
  const [propertyInformation, setPropertyInformation] = useState({});
  const [relatedContacts, setRelatedContacts] = useState();
  const [invoice, setInvoice] = useState();
  const [summary, setSumamry] = useState();
  const [overview, setOverview] = useState();
  const [ground, setGround] = useState([]);
  const [roof, setRoof] = useState([]);
  const [exterior, setExterior] = useState([]);
  const [pdfData, setPdfData] = useState();
  const [garage, setGarage] = useState([]);
  const [basement, setBasement] = useState([]);
  const [bathroom, setBathroom] = useState([]);
  const [crawlSpace, setCrawlSpace] = useState([]);
  const [diningRoom, setDiningRoom] = useState([]);
  const [electricCoolingSystem, setElectricCoolingSystem] = useState([]);
  const [heatingSystem, setHeatingSystem] = useState([]);
  const [interior, setInterior] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [laundryRoom, setLaundryRoom] = useState([]);
  const [livingRoom, setLivingRoom] = useState([]);
  const [bedroom, setBedroom] = useState([]);

  const [plumbing, setPlumbing] = useState([]);
  const [comments, setComments] = useState();

  const [refresh, setRefresh] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    getCommentsReq("summary", "item").then((res) => {
      setComments(res.comments);
    });
    getInspectionReq(id)
      .then((res) => {
        setGeneral(res?.general);
        setPropertyInformation(res?.property);
        setRelatedContacts(res?.contact);
        setInspectionData(res);
        setInvoice(res.invoice);
        setSumamry(res.summary);
        setOverview(res.overview);
        setGround(res.grounds);
        setRoof(res.roof);
        setExterior(res.exterior);
        setGarage(res.garage);
        setBasement(res.basement);
        setBathroom(res.bathroom);
        setCrawlSpace(res.crawlSpace);
        setDiningRoom(res.diningRoom);
        setElectricCoolingSystem(res.electricCoolingSystem);
        setHeatingSystem(res.heatingSystem);
        setInterior(res.interior);
        setKitchen(res.kitchen);
        setLaundryRoom(res.laundryRoom);
        setLivingRoom(res.livingRoom);
        setBedroom(res.bedroom)

        setPlumbing(res.plumbing);
      })
      .catch((e) => console.log(e));

    getPdfDataReq(localStorage.getItem("userId"), id)
      .then((res) => setPdfData(res))
      .catch((error) => console.log(error));
  }, [refresh]);

  useEffect(() => {
    setOverview((prev) => ({
      ...prev,
      yearBuilt: propertyInformation?.yearBuilt,
    }));
  }, [propertyInformation]);

  useEffect(() => {
    setGeneral(inspectionData?.general);
    setPropertyInformation(inspectionData?.property);
    setRelatedContacts(inspectionData?.contact);
  }, [inspectionData]);

  return (
    <div>
      <ComponentProvider>
        <div className="reportContainer">
          <ReportNavbar
            ground={ground}
            roof={roof}
            toggleRefresh={toggleRefresh}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Routes>
                <Route
                  path="/"
                  element={
                    <GeneralDetails
                      toggleRefresh={toggleRefresh}
                      general={general}
                      property={propertyInformation}
                      id={id}
                    />
                  }
                />
                <Route
                  path="/property"
                  element={
                    <PropertyDetails
                      toggleRefresh={toggleRefresh}
                      property={propertyInformation}
                      id={id}
                    />
                  }
                />
                <Route
                  path="contacts"
                  element={
                    <RelatedContacts
                      toggleRefresh={toggleRefresh}
                      contacts={relatedContacts}
                      id={id}
                    />
                  }
                />
                <Route
                  path="invoice"
                  element={
                    <Invoice
                      toggleRefresh={toggleRefresh}
                      invoice={invoice}
                      id={id}
                    />
                  }
                />
                <Route
                  path="summary"
                  element={
                    <Summary
                      toggleRefresh={toggleRefresh}
                      id={id}
                      summaryData={summary}
                      comments={comments?.summary}
                    />
                  }
                />
                <Route
                  path="overview"
                  element={
                    <Overview
                      toggleRefresh={toggleRefresh}
                      id={id}
                      overviewData={overview}
                      comments={comments?.overview}
                    />
                  }
                />

                <Route
                  path={`/ground/:groundId/*`}
                  element={
                    <GroundRoute
                      toggleRefresh={toggleRefresh}
                      ground={ground}
                      comments={comments?.ground}
                    />
                  }
                />
                <Route
                  path={`/roof/:roofId/*`}
                  element={
                    <RoofRoute
                      toggleRefresh={toggleRefresh}
                      roof={roof}
                      comments={comments?.roof}
                    />
                  }
                />
                <Route
                  path={`/exterior/:exteriorId/*`}
                  element={
                    <ExteriorRoute
                      toggleRefresh={toggleRefresh}
                      exterior={exterior}
                      comments={comments?.exterior}
                    />
                  }
                />
                <Route
                  path={`/garage/:garageId/*`}
                  element={
                    <GarageRoute
                      toggleRefresh={toggleRefresh}
                      garage={garage}
                      comments={comments?.garage}
                    />
                  }
                />
                <Route
                  path={`/basement/:basementId/*`}
                  element={
                    <BasementRoutes
                      toggleRefresh={toggleRefresh}
                      basement={basement}
                      comments={comments?.basement}
                    />
                  }
                />
                <Route
                  path={`/bathroom/:bathroomId/*`}
                  element={
                    <BathroomRoutes
                      toggleRefresh={toggleRefresh}
                      bathroom={bathroom}
                      comments={comments?.bathroom}
                    />
                  }
                />
                <Route
                  path={`/bedroom/:bedroomId/*`}
                  element={
                    <BedRoomRoutes
                      toggleRefresh={toggleRefresh}
                      bedroom={bedroom}
                      comments={comments?.bedroom}
                    />
                  }
                />
                <Route
                  path={`/crawlSpace/:crawlSpaceId/*`}
                  element={
                    <CrawlSpaceRoutes
                      toggleRefresh={toggleRefresh}
                      crawlSpace={crawlSpace}
                      comments={comments?.crawlSpace}
                    />
                  }
                />
                <Route
                  path={`/diningRoom/:diningRoomId/*`}
                  element={
                    <DiningRoomRoutes
                      toggleRefresh={toggleRefresh}
                      diningRoom={diningRoom}
                      comments={comments?.diningRoom}
                    />
                  }
                />
                <Route
                  path={`/electricCoolingSystem/:electricCoolingSystemId/*`}
                  element={
                    <ElectricCoolingSystemRoutes
                      toggleRefresh={toggleRefresh}
                      electricCoolingSystem={electricCoolingSystem}
                      comments={comments?.electricCoolingSystem}
                    />
                  }
                />
                <Route
                  path={`/heatingSystem/:heatingSystemId/*`}
                  element={
                    <HeatingSystemRoutes
                      toggleRefresh={toggleRefresh}
                      heatingSystem={heatingSystem}
                      comments={comments?.heatingSystem}
                    />
                  }
                />
                <Route
                  path={`/interior/:interiorId/*`}
                  element={
                    <InteriorRoutes
                      toggleRefresh={toggleRefresh}
                      interior={interior}
                      comments={comments?.interior}
                    />
                  }
                />
                <Route
                  path={`/kitchen/:kitchenId/*`}
                  element={
                    <KitchenRoutes
                      toggleRefresh={toggleRefresh}
                      kitchen={kitchen}
                      comments={comments?.kitchen}
                    />
                  }
                />
                <Route
                  path={`/laundryRoom/:laundryRoomId/*`}
                  element={
                    <LaundryRoomRoutes
                      toggleRefresh={toggleRefresh}
                      laundryRoom={laundryRoom}
                      comments={comments?.laundryRoom}
                    />
                  }
                />
                <Route
                  path={`/livingRoom/:livingRoomId/*`}
                  element={
                    <LivingRoomRoutes
                      toggleRefresh={toggleRefresh}
                      livingRoom={livingRoom}
                      comments={comments?.livingRoom}
                    />
                  }
                />

                <Route
                  path={`/plumbing/:plumbingId/*`}
                  element={
                    <PlumbingRoutes
                      toggleRefresh={toggleRefresh}
                      plumbing={plumbing}
                      comments={comments?.plumbing}
                    />
                  }
                />

                <Route
                  path="output"
                  element={<PDFConverter pdfData={pdfData} inspectionId={id} />}
                />
              </Routes>
            </div>

            <ReportNavigationDrawer
              ground={ground}
              roof={roof}
              exterior={exterior}
              garage={garage}
              basement={basement}
              bathroom={bathroom}
              crawlSpace={crawlSpace}
              diningRoom={diningRoom}
              electricCoolingSystem={electricCoolingSystem}
              heatingSystem={heatingSystem}
              interior={interior}
              kitchen={kitchen}
              laundryRoom={laundryRoom}
              livingRoom={livingRoom}
              bedroom={bedroom}

              plumbing={plumbing}
              toggleRefresh={toggleRefresh}
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </div>
        </div>
      </ComponentProvider>
    </div>
  );
}

export default Report;
