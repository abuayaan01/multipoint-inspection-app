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

function Drainage({ toggleRefresh, basementData, comments }) {
  const [data, setData] = useState(basementData.drainage);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm();
  const [photos, setPhotos] = useState([]);
  const { id, basementId } = useParams();
  const [extra, setExtra] = useState([]);

  const inspectionId = id;
  const onSubmit = async (data) => {
    setLoading(true);
    const reqData = { drainage: { ...data, extra: extra } };
    await updatePropertyReq(
      inspectionId,
      basementId,
      reqData,
      "basement",
      "drainage",
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

  const sumpPumpOptions = {
    label: "Sump Pump",
    name: "sumpPump",
    options: [
      "Yes",
      "No",
      "Working",
      "Not Working",
      "Needs cleaning",
      "Pump not tested",
    ],
  };
  const floorDrainsOptions = {
    label: "Floor Drains",
    name: "floorDrains",
    options: ["Yes", "Not Visible", "Drains not tested"],
  };

  const Options = [sumpPumpOptions, floorDrainsOptions];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Drainage</p>

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
              comment={comments?.drainage}
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

export default Drainage;
