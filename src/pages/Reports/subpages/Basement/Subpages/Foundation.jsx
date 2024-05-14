import React, { useState, useEffect } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import { useParams } from "react-router-dom";
import FormFieldsCreator from "./../../../../../components/FormFieldsCreator";

function Foundation({ toggleRefresh, basementData, comments }) {
  const [data, setData] = useState(basementData.foundation);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm();
  const [photos, setPhotos] = useState([]);
  const { id, basementId } = useParams();
  const [extra, setExtra] = useState([]);

  const inspectionId = id;
  const onSubmit = async (data) => {
    setLoading(true);
    const reqData = { foundation: { ...data, extra: extra } };
    await updatePropertyReq(
      inspectionId,
      basementId,
      reqData,
      "basement",
      "foundation",
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
          // setData(alsothis);
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

  const materialOptions = {
    label: "Material",
    name: "material",
    options: [
      "ICF",
      "Brick",
      "Concrete Block",
      "Stone Masonry",
      "Poured Concrete",
      "Wood",
    ],
  };
  const conditionOptions = {
    label: "Condition",
    name: "condition",
    options: [
      "Satisfactory",
      "Marginal",
      "Poor",
      "Have Evaluated",
      "Monitor",
      "Not Elevated",
    ],
  };

  const direction = ["None", "North", "South", "East", "West"];

  const horizontalCracksOptions = {
    label: "Horizontal Cracks",
    name: "horizontalCracks",
    options: direction,
  };
  const stepCracksOptions = {
    label: "Step Cracks",
    name: "stepCracks",
    options: direction,
  };
  const verticalCracksOptions = {
    label: "Vertical Cracks",
    name: "verticalCracks",
    options: direction,
  };
  const coveredWallsOptions = {
    label: "Covered Walls",
    name: "coveredWalls",
    options: direction,
  };
  const movementApparentOptions = {
    label: "Movement Apparent",
    name: "movementApparent",
    options: direction,
  };
  const indicationOfMoistureOptions = {
    label: "Indication Of Moisture",
    name: "indicationOfMoisture",
    options: ["Yes", "No", "Fresh", "Old stains"],
  };

  const Options = [
    materialOptions,
    conditionOptions,
    horizontalCracksOptions,
    stepCracksOptions,
    verticalCracksOptions,
    coveredWallsOptions,
    movementApparentOptions,
    indicationOfMoistureOptions,
  ];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Foundation</p>

        <div className="mt-5">
          {Options.map((CheckElem, idx) => {
            return (
              <div key={CheckElem.name}>
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
              comment={comments?.foundation}
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

export default Foundation;
