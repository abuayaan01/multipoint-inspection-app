import React, { useState, useEffect } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import Input from "../../../../../components/Input";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";

function BoilerSystem({ toggleRefresh, heatingSystemData, comments }) {
  const [data, setData] = useState(heatingSystemData.boilerSystem);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, heatingSystemId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      boilerSystem: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      heatingSystemId,
      reqData,
      "heatingSystem",
      "boilerSystem",
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

  const Options = [
    {
      label: "Brand Name",
      name: "brandName#1",
      options: [
        "Amana",
        "Carrier",
        "Climatrol",
        "Fedders",
        "Lennox",
        "Luxaire",
        "Rheem",
        "Ruud",
        "Sears",
        "Sunbeam",
        "Tappan",
        "Trane",
        "Whirlpool",
      ],
    },
    {
      label: "Approx Age",
      name: "approxAge#1",
      options: [
        "Unknown",
        "Older",
        "1-5+",
        "5-10+",
        "10-15+",
        "15-20+",
        "20-25+",
        "25+",
      ],
    },
    {
      label: "Condition",
      name: "condition",
      options: [
        "Satisfactory",
        "Marginal",
        "Poor",
        "Recommended HVAC technician examine",
      ],
    },
    {
      label: "Energy source",
      name: "enerySource",
      options: ["Gas", "LP", "Oil", "Elastic", "Solid fuel"],
    },
    {
      label: "Distribution",
      name: "distribution",
      options: ["Hot Water", "Baseboard", "Steam", "Radiator", "Radiant floor"],
    },
    {
      label: "Circulator",
      name: "circulator",
      options: ["Pump", "Gravity", "Multiple zones"],
    },
    {
      label: "Controls",
      name: "controls",
      options: [
        "Temp/pressure gauge exist",
        "Operable",
        "Non operable",
      ],
    },
    {
      label: "Oil fired units",
      name: "OilFiredUnits",
      options: [
        "Disconnected",
        "Not Disconnected",
      ],

    },
    {
      label: "Combustion air venting present",
      name: "Combustion air venting present",
      options: ["N/A", "Yes", "No"],
    },
    {
      label: "Relief valve",
      name: "reliefValve",
      options: [
        "Yes",
        "No",
        "Missing",
        "Extension proper",
        "Extension need repair/replace",
      ],
    },
    {
      label: "Operated - When turned on by thermostat",
      name: "whenTurnedOnByThermostat",
      options: ["Fired", "Did not fire"],
    },
    {
      label: "Operation",
      name: "operation",
      options: [
        "Satisfactory",
        "Recommend HVAC technician examine before closing",
      ],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Boiler System</p>

        <div className="mt-5">
          {Options.map((CheckElem, idx) => {
            return (
              <>
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
               {idx == 1 && (
                <>
                  <Input
                    label={"Model #"}
                    name={"model#1"}
                    register={register}
                  />
                  <Input
                    label={"Serial #"}
                    name={"serial#1"}
                    register={register}
                  />
                </>
              )}
              </>
            );
          })}
        </div>
        <Input label={"Other"} name={"other"} register={register} />

        <Controller
          name="comments"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Comments"}
              value={value}
              onChange={onChange}
              comment={comments?.boilerSystem}
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

export default BoilerSystem;
