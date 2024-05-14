import React, { useState, useEffect } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";

function MainPanel({ toggleRefresh, electricCoolingSystemData, comments }) {
  const [data, setData] = useState(electricCoolingSystemData.mainPanel);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, electricCoolingSystemId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      mainPanel: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      electricCoolingSystemId,
      reqData,
      "electricCoolingSystem",
      "mainPanel",
      photos
    )
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Saved",
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          });
          // setData(res);
          toggleRefresh();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    setLoading(false);
  };
  useEffect(() => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        setValue(key, data[key]);
      }
      let extra2 = [];
      if (data.extra) {
        data["extra"].forEach((element) => {
          extra2.push(JSON.parse(element));
        });

        setExtra(extra2);
      } else {
        setExtra([]);
      }
    }
  }, [setValue, data]);

  const option1 = {
    label: "Location",
    name: "location",
    options: [
      "Exterior wall",
      "Garage",
      "Hallway",
      "Basement",
      "Closet",
      "Outbuilding",
      "Pool",
      "Hot Tub",
    ],
  };
  const option2 = {
    label: "Condition",
    name: "condition",
    options: ["Satisfactory", "Poor"],
  };
  const option3 = {
    label: "Adequate Clearance to Panel",
    name: "adequateClearanceToPanel",
    options: ["Yes", "Not"],
  };
  const option4 = {
    label: "Amperage/Voltage",
    name: "amprageVoltage",
    options: ["Unknown", "60a", "100a", "150a", "200a", "400a", "120v/240v"],
  };
  const option5 = {
    label: "Breakers/Fuses",
    name: "breakersFuses",
    options: ["Breakers", "Fuses"],
  };
  const option6 = {
    label: "Appears grounded",
    name: "appearsGrounded",
    options: ["Yes", "No", "Not visible"],
  };
  const option7 = {
    label: "GFCI breaker",
    name: "GFCIbreaker",
    options: ["N/A", "Operable", "Not operable"],
  };
  const option8 = {
    label: "AFCI breaker",
    name: "AFCIbreaker",
    options: ["N/A", "Operable", "Not operable", "Not tested"],
  };
  const option9 = {
    label: "Main wire",
    name: "mainWire",
    options: [
      "Copper",
      "Aluminum",
      "Not Visible",
      "Double tapping of the main wire",
    ],
  };
  const option10 = {
    label: "Main wire condition",
    name: "mainWireCondition",
    options: ["Satisfactory", "Marginal", "Poor"],
  };
  const option11 = {
    label: "Branch wire condition",
    name: "BranchWireCondition",
    options: [
      "Satisfactory",
      "Marginal",
      "Poor",
      "Recommend electrician evaluate/repair",
      "Recommend separating/isolating neutrals",
      "Recommend electrician repair/evaluate box",
      "Romex",
      "BX cable",
      "Conduit",
      "Knob/Tube",
      "Double tapping",
      "Wires undersized/oversized breaker/fuse",
      "Panel not accessible",
      "Not evaluated",
      "Safety Hazard",
    ],
  };
  const option12 = {
    label: "Branch wire",
    name: "BranchWire",
    options: [
      "Copper",
      "Aluminum",
      "Solid Branch Aluminium Wiring",
      "Not Visible",
    ],
  };

  const Options = [
    option1,
    option2,
    option3,
    option4,
    option5,
    option6,
    option7,
    option8,
    option9,
    option10,
    option11,
    option12,
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Main Panel</p>

        <div className="mt-5">
          {Options.map((CheckElem, idx) => {
            return (
              <div key={CheckElem.label}>
                <Controller
                  name={CheckElem.name}
                  control={control}
                  render={({ field }) => (
                    <CustomCheckboxGroup
                      label={CheckElem.label}
                      name={CheckElem.name}
                      control={control}
                      options={CheckElem.options}
                    />
                  )}
                />
              </div>
            );
          })}
        </div>

        <Controller
          name="comments"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Comments"}
              value={value}
              onChange={onChange}
              comment={comments?.mainPanel}
            />
          )}
        />

        <FormFieldsCreator extra={extra} setExtra={setExtra} />
        <ImageContainer setPhotos={setPhotos} photos={data?.photos} />
        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default MainPanel;
