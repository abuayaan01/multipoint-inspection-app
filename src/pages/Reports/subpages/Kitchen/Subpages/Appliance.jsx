import React, { useState, useEffect } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Input from "../../../../../components/Input";
import Editor from "../../../../../components/Editor";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";

function Appliance({ toggleRefresh, kitchenData, comments }) {
  const [data, setData] = useState(kitchenData.appliances);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, kitchenId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      appliances: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      kitchenId,
      reqData,
      "kitchen",
      "appliances",
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
    label: "Disposal",
    name: "disposal",
    options: ["N/A", "Operable", "Not oprable", "Not tested"],
  };

  const option2 = {
    label: "Oven",
    name: "oven",
    options: ["N/A", "Operable", "Not oprable", "Not tested"],
  };
  const option3 = {
    label: "Range",
    name: "range",
    options: ["N/A", "Operable", "Not oprable", "Not tested"],
  };
  const option4 = {
    label: "Dishwasher",
    name: "dishwasher",
    options: ["N/A", "Operable", "Not oprable", "Not tested"],
  };
  const option5 = {
    label: "Trash Compactor",
    name: "trashCompactor",
    options: ["N/A", "Operable", "Not oprable", "Not tested"],
  };
  const option6 = {
    label: "Exhaust fan",
    name: "exhaustfan",
    options: ["N/A", "Operable", "Not oprable", "Not tested"],
  };
  const option7 = {
    label: "Refrigerator",
    name: "refrigerator",
    options: ["N/A", "Operable", "Not oprable", "Not tested"],
  };
  const option8 = {
    label: "Microwave",
    name: "microwave",
    options: ["N/A", "Operable", "Not oprable", "Not tested"],
  };
  const option9 = {
    label: "Dishwasher airgap",
    name: "dishwasherAirgap",
    options: ["Yes", "No"],
  };
  const option10 = {
    label: "Dishwasher drain line lopped",
    name: "dishwasherDrainLineLopped",
    options: ["Yes", "No"],
  };
  const option11 = {
    label: "Receptacles present",
    name: "receptaclesPresent",
    options: ["Yes", "No", "Operable", "Not Operable"],
  };
  const option12 = {
    label: "GFCI",
    name: "gfci",
    options: [
      "Yes",
      "No",
      "Operable",
      "Not Operable",
      "Potential Safety Hazard(s)",
      "Recommend GFCI Receptacles",
    ],
  };
  const option13 = {
    label: "Open ground/Reverse polarity",
    name: "openGroundReversePolarity",
    options: ["Yes", "No", "Potential Safety Hazard(s)"],
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
    option13,
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Appliance</p>

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
              comment={comments?.appliance}
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

export default Appliance;
