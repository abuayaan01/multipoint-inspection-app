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

function Skylights({ toggleRefresh, roof ,comments}) {
  const [data, setData] = useState(roof.skylights);
  const { register, handleSubmit, setValue, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const { id, roofId } = useParams();
  const inspectionId = id;
  const [extra, setExtra] = useState([]);

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      skylights: { ...data, extra: extra },
    };
    await updatePropertyReq(inspectionId, roofId, reqData,'roof', "skylights", photos)
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
          setData(res.skylights);
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
  const visibiltyOptions = {
    label: "Visibility",
    name: "visibility",
    options: ["Not Present", "Not visible"],
  };
  const conditionOptions = {
    label: "Condition",
    name: "condition",
    options: ["Satisfactory", "Marginal", "Poor", "Cracked/Broken"],
  };
  const skylightsCheckboxes = [visibiltyOptions, conditionOptions];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="text-slate-700 text-center leading-normal uppercase text-md">
          Skylight
        </p>

        <div className="mt-5">
          {skylightsCheckboxes.map((CheckElem, idx) => {
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
            <Editor label={"Comments"} value={value} onChange={onChange} comment={comments?.skylights} />
          )}
        />
        <FormFieldsCreator extra={extra} setExtra={setExtra} />
        <ImageContainer setPhotos={setPhotos} photos={data?.photos} />
        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default Skylights;
