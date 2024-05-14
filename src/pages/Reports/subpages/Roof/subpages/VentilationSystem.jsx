import React, { useEffect, useState } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/SaveButton";
import { useForm, Controller } from "react-hook-form";
import { updatePropertyReq } from "../../../../../services/api";
import Swal from "sweetalert2";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import { useParams } from "react-router-dom";
import FormFieldsCreator from "./../../../../../components/FormFieldsCreator";

function VentilationSystem({ toggleRefresh, roof, comments }) {
  const [data, setData] = useState(roof.ventilationSystem);
  const { register, handleSubmit, setValue, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const { id, roofId } = useParams();
  const inspectionId = id;
  const [extra, setExtra] = useState([]);

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      ventilationSystem: { ...data, extra: extra },
    };
    await updatePropertyReq(
      inspectionId,
      roofId,
      reqData,
      "roof",
      "ventilationSystem",
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
          setData(res.ventilationSystem);
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
  const typeOptions = {
    label: "Type",
    name: "type",
    options: ["Soffit", "Ridge", "Gable", "Roof", "Turbine", "Powered"],
  };
  const vinsibilityOptions = {
    label: "Visibility",
    name: "visibility",
    options: ["None", "N/A"],
  };
  const ventilationSystemCheckboxes = [vinsibilityOptions, typeOptions];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="text-slate-700 text-center leading-normal uppercase text-md">
          Ventilation System
        </p>

        <div className="mt-5">
          {ventilationSystemCheckboxes.map((CheckElem, idx) => {
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
              comment={comments?.ventilationSystem}
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

export default VentilationSystem;
