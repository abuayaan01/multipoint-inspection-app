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

function ElectricalReceptacles({ toggleRefresh, garageData, comments }) {
  const [data, setData] = useState(garageData.electricalReceptacles);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, garageId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      electricalReceptacles: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      garageId,
      reqData,
      "garage",
      "electricalReceptacles",
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

  const OperableOptions = {
    label: "Operable",
    name: "operable",
    options: ["Yes", "No", "Not Visible"],
  };

  const reversePolarityOptions = {
    label: "Reverse Polarity",
    name: "reversePolarity",
    options: ["Yes", "No"],
  };
  const openGroundOptions = {
    label: "Open Ground",
    name: "openGround",
    options: ["Yes", "No", "Safety Hazard"],
  };
  const gfciOptions = {
    label: "GFCI Present",
    name: "GFCIPresent",
    options: [
      "Operable",
      "Not Operable",
      "Handyman/extension cord wiring",
      "Recommended GFCI Receptacles",
    ],
  };

  const Options = [
    OperableOptions,
    reversePolarityOptions,
    openGroundOptions,
    gfciOptions,
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Electrical Receptacles</p>

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
              comment={comments?.electricalReceptacles}
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

export default ElectricalReceptacles;
