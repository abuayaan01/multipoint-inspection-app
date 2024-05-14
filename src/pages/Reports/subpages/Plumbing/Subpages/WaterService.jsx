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

function WaterService({ toggleRefresh, plumbingData, comments }) {
  const [data, setData] = useState(plumbingData.waterService);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, plumbingId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      waterService: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      plumbingId,
      reqData,
      "plumbing",
      "waterService",
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
      label: "Main shut-off location",
      name: "Main shut-off location",
      options: [
        "Outside at curbside",
        "In the basement",
        "In the garage",
        "In the utility room",
        "On the front exterior wall",
        "On the side exterior wall",
        "On the rear exterior wall",
      ],
    },
    {
      label: "Water entry piping",
      name: "WaterEntryPiping",
      options: [
        "Not Visible",
        "Copper/Galv.",
        "PVC Plastic",
        "CPVC Plastic",
        "Polybutylene Plastic",
        "PEX Plastic",
        "Lead",
        "Polyethylene",
      ],
    },
    {
      label: "Lead other than soldier joints",
      name: "leadOtherThanSoldierJoints",
      options: ["Yes", "No", "Unknown", "Service entry"],
    },
    {
      label: "Visible water distribution piping",
      name: "Visible water distribution piping",
      options: [
        "Copper",
        "Galvanized",
        "PVC Plastic",
        "CPVC Plastic",
        "Polybutylene Plastic",
        "PEX Plastic",
      ],
    },
    {
      label: "Condition",
      name: "Condition",
      options: ["Satisfactory", "Marginal", "Poor"],
    },
    {
      label: "Flow",
      name: "flow",
      options: [
        "Satisfactory",
        "Marginal",
        "Poor",
        "Water pressure over 80 psi",
        "Recommend plumber evaluate",
        "Recommend pressure regulator",
      ],
    },
    {
      label: "Pipes",
      name: "pipes",
      options: [
        "Corroded",
        "Leaking",
        "Valves broken/missing",
        "Dissimilar metal",
        "Cross connection: Yes",
        "Cross connection: No",
        "Cross connection: Safety Hazard",
        "Recommend repair",
        "Recommend a dielectric union Satisfactory",
      ],
    },
    {
      label: "Flow",
      name: "flow",
      options: [
        "Satisfactory",
        "Marginal",
        "Poor",
        "Water pressure over 80 psi",
        "Recommend plumber evaluate",
        "Recommend pressure regulator",
      ],
    },
    {
      label: "Pipes Supply/Drain",
      name: "pipesSupplyDrain",
      options: [
        "Corroded",
        "Leaking",
        "Valves broken/missing",
        "Dissimilar metal",
        "Cross connection: Yes",
        "Cross connection: No",
        "Cross connection: Safety Hazard",
        "Recommend repair",
        "Recommend a dielectric union",
        "Satisfactory",
      ],
    },
    {
      label: "Drain/Waste/Vent pipe",
      name: "drainWasteVentPipe",
      options: ["Copper", "Cast iron", "Galvanized", "PVC", "ABS", "Brass"],
    },
    {
      label: "Condition",
      name: "condition",
      options: ["Satisfactory", "Marginal", "Poor"],
    },
    {
      label: "Support/Insulation",
      name: "supportInsulation",
      options: [
        "N/A",
        "Metal strapping",
        "Plastic strapping",
        "No support",
        "Fiberglass",
        "No insulation",
      ],
    },
    {
      label: "Traps proper P-Type",
      name: "trapsProperPType",
      options: ["Yes", "No", "P-traps recommended"],
    },
    {
      label: "Drainage",
      name: "drainage",
      options: ["Satisfactory", "Marginal", "Poor"],
    },
    {
      label: "Interior fuel storage system",
      name: "Interior fuel storage system",
      options: ["N/A", "Yes", "No", "Leaking"],
    },
    {
      label: "Fuel line",
      name: "fuelLine",
      options: [
        "N/A",
        "Copper",
        "Brass",
        "Black iron",
        "Stainless steel",
        "CSST",
        "Not Visible",
        "Galvanized",
        "Recommend CSST be properly bonded",
      ],
    },
    {
      label: "Condition",
      name: "condition",
      options: [
        "N/A",
        "Satisfactory",
        "Marginal",
        "Poor",
        "Recommend plumber evaluate",
      ],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Water Service</p>

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
              comment={comments?.waterService}
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

export default WaterService;
