import React, { useEffect, useState } from "react";
import { Center, Circle, Card, CardBody } from "@chakra-ui/react";
import NewInspectionForm from "../../components/NewInspectionForm";
import RecentInspection from "../../components/RecentInspection";

function Reports() {
  const [createForm, setCreateForm] = useState(false);

  const handleFormView = () => {
    setCreateForm(false);
  };

  return (
    <>
      <div className="reports relative overflow-hidden">
        <div className="py-10">
          {!createForm ? (
            <>
              <Center
                className="rounded-lg flex flex-col gap-5 border border-slate-300 bg-slate-200 cursor-pointer"
                h="200px"
                color="white"
                onClick={() => setCreateForm(!createForm)}
              >
                <Circle bg="grey" w="40px" h="40px">
                  <Center>
                    <p className="text-3xl mb-[5px]">+</p>
                  </Center>
                </Circle>
                <p className="text-slate-600">Create New Inspection</p>
              </Center>

              <Card className="flex flex-1 shadow-2xl my-5">
                <CardBody>
                  <RecentInspection
                    label={"Total Inspections"}
                  />
                </CardBody>
              </Card>
            </>
          ) : (
            <div>
              <NewInspectionForm HideForm={handleFormView} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Reports;
