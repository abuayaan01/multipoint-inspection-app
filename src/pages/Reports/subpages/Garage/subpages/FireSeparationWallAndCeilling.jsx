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
import { MdRecommend } from "react-icons/md";

function FireSeparationWallAndCeilling({
  toggleRefresh,
  garageData,
  comments,
}) {
  const [data, setData] = useState(garageData.fireSeparationWallAndCeilling);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, garageId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      fireSeparationWallAndCeilling: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      garageId,
      reqData,
      "garage",
      "fireSeparationWallAndCeilling",
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
          setData(res);
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

  const availabilityOptions = {
    label: "Availability",
    name: "availability",
    options: ["N/A", "Present", "Missing", "Recommended repair"],
  };

  const conditionOptions = {
    label: "Condition",
    name: "condition",
    options: [
      "Satisfactory",
      "Recommended repair",
      "Holes walls/ceiling",
      "Safety Hazard(s)",
    ],
  };

  const moistureStainsOptions = {
    label: "Moisture Stains Present",
    name: "moistureStains",
    options: ["Yes", "No"],
  };

  const typicalCracksOptions = {
    label: "Typical Cracks",
    name: "typicalCracks",
    options: ["Yes", "No"],
  };

  const fireDoorsOptions = {
    label: "Fire Door",
    name: "fireDoor",
    options: [
      "Not verifiable",
      "Not a fire door",
      "Needs repair",
      "Satisfactory",
    ],
  };

  const selfClosureOptions = {
    label: "Self Closure",
    name: "selfClosure",
    options: ["N/A", "Satisfactory", "Inoperative", "Missing"],
  };

  const Options = [
    availabilityOptions,
    conditionOptions,
    moistureStainsOptions,
    typicalCracksOptions,
    fireDoorsOptions,
    selfClosureOptions,
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Fire Separation Walls And Ceilling</p>

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
              comment={comments?.fireSeparationWallAndCeilling}
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

export default FireSeparationWallAndCeilling;
