import React, { useState } from "react";
import ServiceCard from "../../components/ServiceCard";
import RecentInspection from "../../components/RecentInspection";
import { useNavigate } from "react-router-dom";
import { CardBody, Card, Box, Grid, GridItem } from "@chakra-ui/react";
import { TbReportSearch } from "react-icons/tb";
import InspectionCalendar from "../../components/Calendar";
import UpcomingInspection from "../../components/upcomingInspection/UpcomingInspection";
import { AiOutlinePlusCircle, AiOutlineFilePdf } from "react-icons/ai";
import { BiExpand } from "react-icons/bi";
import { PiNotePencil } from "react-icons/pi";

function Home() {
  const [totalReport, setTotalReport] = useState(0);
  const [refreshRecentInspection, setRefreshRecentInspection] = useState(false);
  const [refreshUpcomingInspection, setrefreshUpcomingInspection] =
    useState(false);

  const toggleRefreshRecentInspection = () => {
    setRefreshRecentInspection(!refreshRecentInspection);
  };

  const toggleRefreshUpcomingInspection = () => {
    setrefreshUpcomingInspection(!refreshUpcomingInspection);
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="my-8 serviceCard flex gap-5">
        <ServiceCard
          text={"New Inspection"}
          cardColor={"#8FE4AC"}
          icon={<AiOutlinePlusCircle className="text-slate-100 text-xl" />}
          iconBg={"#68DA8F"}
          data={""}
          onClick={() => {         
            navigate("reports");
          }}
        />
        <ServiceCard
          text={"Total Reports"}
          cardColor={"#CFAFFF"}
          icon={<TbReportSearch className="text-slate-100 text-xl" />}
          iconBg={"#C39EF9"}
          data={totalReport}
          onClick={() => {
            navigate("reports");
          }}
        />
        <ServiceCard
          text={"New Report Send"}
          cardColor={"#C5C5C5"}
          icon={<AiOutlineFilePdf className="text-slate-100 text-xl" />}
          iconBg={"#ADADAD"}
          data={0}
        />
        <ServiceCard
          text={"Manage Template"}
          cardColor={"#C1C6DE"}
          icon={<PiNotePencil className="text-slate-100 text-xl" />}
          iconBg={"#9EAAE7"}
        />
      </div>

      <Grid
        templateAreas={`"ri cl"
                  "ri cl"
                  "ui cl"`}
        gap="5"
        gridTemplateColumns={"1fr 340px"}
        className="flex! gap-5!"
      >
        <GridItem area={"ri"}>
          <Card className="flex flex-1 shadow-2xl mt-5">
            <CardBody>
              <RecentInspection
                no={setTotalReport}
                label={"Recent Inspections"}
                home={true}
                refreshRecentInspection={refreshRecentInspection}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem area={"cl"}>
          <Card maxW={"sm"} className="my-5">
            <CardBody>
              <InspectionCalendar
                height={"300px"}
                width={"300px"}
                views={["month"]}
                toggleRefreshUpcomingInspection={toggleRefreshUpcomingInspection}
              />
              <BiExpand
                title="Expand"
                className="text-slate-700 absolute top-[10px] right-3 cursor-pointer"
                onClick={() => {
                  navigate("schedules");
                }}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem area={"ui"}>
          <div className="flex flex-1">
            <div>
              <UpcomingInspection
                toggleRefreshRecentInspection={toggleRefreshRecentInspection}
                refreshUpcomingInspection={refreshUpcomingInspection}
              />
            </div>
          </div>
        </GridItem>
      </Grid>
    </>
  );
}

export default Home;
