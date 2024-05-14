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

function Subpanels({ toggleRefresh, electricCoolingSystemData, comments }) {
  const [data, setData] = useState(electricCoolingSystemData.subpanels);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, electricCoolingSystemId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      subpanels: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      electricCoolingSystemId,
      reqData,
      "electricCoolingSystem",
      "subpanels",
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
      label: "Availability",
      name: "availability",
      options: ["None apparent"],
    },
    {
      label: "Location",
      name: "location",
      options: [
        "Exterior Wall",
        "Garage",
        "Hallway",
        "Basement",
        "Closet",
        "Outbuilding",
        "Pool",
        "Hot tub",
      ],
    },
    {
      label: "Evaluation",
      name: "evaluation",
      options: [
        "Panel not accessible",
        "Not evaluated",
        "Recommend separating/isolating neutrals",
        "Recommend electrician repair/evaluate box",
      ],
    },
    {
      label: "Branch wire",
      name: "branchWire",
      options: [
        "Copper",
        "Aluminium",
        "Safety hazard",
        "Neutral/ground separated",
        "Neutral isolated",
      ],
    },
    {
      label: "Condition",
      name: "condition",
      options: ["Satisfactory", "Marginal", "Poor"],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Sub panel(s)</p>

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
              comment={comments?.subpanels}
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

export default Subpanels;
