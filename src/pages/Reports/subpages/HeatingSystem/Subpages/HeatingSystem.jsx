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

function HeatingSystem({ toggleRefresh, heatingSystemData, comments }) {
  const [data, setData] = useState(heatingSystemData.heatingSystem);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, heatingSystemId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      heatingSystem: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      heatingSystemId,
      reqData,
      "heatingSystem",
      "heatingSystem",
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

  const unit1Options = [
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
      name: "unit#1Condition",
      options: [
        "Satisfactory",
        "Marginal",
        "Poor",
        "Recommended HVAC technician examine",
      ],
    },
  ];
  const unit2Options = [
    {
      label: "Brand Name",
      name: "brandName#2",
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
      name: "approxAge#2",
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
      name: "unit#2Condition",
      options: [
        "Satisfactory",
        "Marginal",
        "Poor",
        "Recommended HVAC technician examine",
      ],
    },
  ];

  const heatingSystemOptions = [
    {
      label: "Energy source",
      name: "enerySource",
      options: ["Gas", "LP", "Oil", "Elastic", "Solid fuel"],
    },
    {
      label: "Warm air system",
      name: "warmAirSystem",
      options: [
        "Belt drive",
        "Direct drive",
        "Gravity",
        "Central system",
        "Flooe/wall furnace",
      ],
    },
    {
      label: "Heat exchanger",
      name: "heatExchanger",
      options: [
        "N/A",
        "Sealed",
        "Not Visible",
        "Visual w/mirror",
        "Flame/distortion",
        "Rusted",
        "Carbon/soot buildup",
      ],
    },
    {
      label: "Carbon monoxide",
      name: "carbonMonoxide",
      options: [
        "N/A",
        "Detected as plenum",
        "Detected as register",
        "Not tested",
      ],
    },
    {
      label: "Combustion air venting present",
      name: "Combustion air venting present",
      options: ["N/A", "Yes", "No"],
    },
    {
      label: "Controls",
      name: "controls",
      options: [
        "Disconnected",
        "Normal operating and safetyd",
        "Gas huuty off calye",
      ],
    },
    {
      label: "Distribution",
      name: "distribution",
      options: [
        "Metal duct",
        "Insulated flex duct",
        "Cold air returns",
        "Ducts board",
        "Asbestos-like-wrap",
        "Safety Hazard",
      ],
    },
    {
      label: "Fuel piping",
      name: "fuelPiping",
      options: [
        "N/A",
        "Satisfactory",
        "Rusted",
        "Improper slope",
        "Safety Hazard",
        "Recommend repair/replace",
      ],
    },
    {
      label: "Filter",
      name: "filter",
      options: [
        "Standard",
        "Electrostatic",
        "Satisfactory",
        "Needs cleaning/replacement",
        "Missing",
        "Electronic (not tested)",
      ],
    },
    {
      label: "When turned on by thermostat",
      name: "whenturnedonbythermostat",
      options: [
        "Fired",
        "Did not fire",
        "Proper operation",
        "Improper operation",
      ],
    },
    {
      label: "Heat pump",
      name: "heatPump",
      options: ["N/A", "Supplemental electric", "Supplental gas"],
    },
    {
      label: "Sub-slab ducts",
      name: "SubSlabDucts",
      options: [
        "N/A",
        "Satisfactory",
        "Marginal",
        "Poor",
        "Water/Sand Observed",
      ],
    },
    {
      label: "System not operated due to",
      name: "systemNotOperatedDueTo",
      options: ["N/A", "Exterior temprature", "Other"],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Heating System</p>

        <div className="mt-5">
          <p className="mx-4 block py-2 font-semibold text-slate-700">
            Unit #1
          </p>
          {unit1Options.map((CheckElem, idx) => {
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
          <p className="mx-4 block py-2 font-semibold text-slate-700">
            Unit #2
          </p>

          {[...unit2Options, ...heatingSystemOptions].map((CheckElem, idx) => {
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
                  {idx == 1 && (
                    <>
                      <Input
                        label={"Model #"}
                        name={"model#2"}
                        register={register}
                      />
                      <Input
                        label={"Serial #"}
                        name={"serial#2"}
                        register={register}
                      />
                    </>
                  )}
                </div>
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
              comment={comments?.heatingSystem}
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

export default HeatingSystem;
