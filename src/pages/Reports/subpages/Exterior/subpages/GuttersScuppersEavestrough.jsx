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

function GuttersScuppersEavestrough({ toggleRefresh, exterior, comments }) {
  const [data, setData] = useState(exterior.guttersScuppersEavestrough);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, exteriorId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      guttersScuppersEavestrough: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      exteriorId,
      reqData,
      "exterior",
      "guttersScuppersEavestrough",
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
          setData(res.guttersScuppersEavestrough);
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
    options: ["None"],
  };
  const conditionOptions = {
    label: "Condition",
    name: "condition",
    options: [
      "Satisfactory",
      "Marginal",
      "Poor",
      "Rusting",
      "Downspouts needed",
      "Recommend Repair",
    ],
  };
  const materialOptions = {
    label: "Material",
    name: "material",
    options: ["Copper", "Vinyl/Plastic", "Poor", "Galvanized/Aluminum"],
  };
  const leakingOptions = {
    label: "Leaking",
    name: "leaking",
    options: ["Corners", "Joints", "Hole in main run", "No apparent leaks"],
  };

  const extentionNeededOptions = {
    label: "Extention Needed",
    name: "extentionNeeded",
    options: ["North", "South", "East", "West", "N/A"],
  };

  const attachmentOptions = {
    label: "Attachment",
    name: "attachment",
    options: ["Loose", "Missing spikes", "Improperly sloped", "Satisfactory"],
  };

  const Options = [
    availabilityOptions,
    conditionOptions,
    materialOptions,
    leakingOptions,
    attachmentOptions,
    extentionNeededOptions,
  ];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Gutters/Scuppers/Eavestrough</p>

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
              comment={comments?.guttersScuppersDownspouts}
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

export default GuttersScuppersEavestrough;
