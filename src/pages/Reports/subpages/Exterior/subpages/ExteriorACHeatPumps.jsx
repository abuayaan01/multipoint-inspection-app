import React, { useState, useEffect } from "react";

import Input from "../../../../../components/Input";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";

const ExteriorACHeatPumps = ({ toggleRefresh, exterior, comments }) => {
  const [data, setData] = useState(exterior.exteriorACHeatPumps);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, exteriorId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      exteriorACHeatPumps: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      exteriorId,
      reqData,
      "exterior",
      "exteriorACHeatPumps",
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
          setData(res.exteriorACHeatPumps);
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

  const availableOptions = {
    label: "Available",
    name: "availability",
    options: ["N/A"],
  };
  const conditionOptions = {
    label: "Condition",
    name: "condition",
    options: ["Satisfactory", "Marginal", "Poor", "Cabinet/housing rusted"],
  };
  const energySourceOptions = {
    label: "Energy Source",
    name: "energySource",
    options: ["Electric", "Gas", "Other"],
  };
  const unitTypeOptions = {
    label: "Unit Type",
    name: "unitType",
    options: ["Air cooled", "Gas cooled", "Geothermal", "Heat pump"],
  };
  const levelOptions = {
    label: "Level",
    name: "level",
    options: ["Yes", "No", "Recommend re-level unit"],
  };
  const condenserFinsOptions = {
    label: "Condenser Fins",
    name: "condenserFins",
    options: [
      "Damaged",
      "Need cleaning",
      "Damaged base/pad",
      "Damaged Refrigerant Line",
      "Satisfactory",
    ],
  };
  const insulationOptions = {
    label: "Insulation",
    name: "insulation",
    options: ["Yes", "No", "Replace"],
  };
  const improperClearenceOptions = {
    label: "Improper Clearance (air flow)",
    name: "improperClearance",
    options: ["Yes", "No"],
  };

  const Options = [
    availableOptions,
    conditionOptions,
    energySourceOptions,
    unitTypeOptions,
    levelOptions,
    condenserFinsOptions,
    insulationOptions,
    improperClearenceOptions,
  ];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Exterior AC Heat Pumps</p>

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

        <Input name={"brand"} label={"Brand"} register={register} />
        <Input name={"model"} label={"Model#"} register={register} />
        <Input name={"serial"} label={"Serial#"} register={register} />
        <Input
          name={"approximateAge"}
          label={"Approximate Age"}
          register={register}
        />
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
              comment={comments?.exteriorACHeatPumps}
            />
          )}
        />

        <FormFieldsCreator extra={extra} setExtra={setExtra} />
        <ImageContainer setPhotos={setPhotos} photos={data?.photos} />
        <SaveButton loading={loading} />
      </form>
    </>
  );
};

export default ExteriorACHeatPumps;
