import React, { useState, useEffect } from "react";
import Input from "../../../../../components/Input";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { useForm, Controller } from "react-hook-form";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function WindowsScreens({ toggleRefresh, exterior ,comments}) {
  const [data, setData] = useState(exterior.windowsScreens);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, exteriorId } = useParams();

  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      windowsScreens: { ...data, extra: extra },
    };
    await updatePropertyReq(id, exteriorId, reqData,'exterior', "windowsScreens", photos)
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
          setData(res.windowsScreens);
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

  // useEffect(()=>(console.log(exterior)),[])

  const screensOptions = {
    label: "Screens",
    name: "screens",
    options: ["Torn", "Bent", "Not installed", "Satisfactory"],
  };

  const conditionOptions = {
    label: "Condition",
    name: "condition",
    options: ["Satisfactory", "Marginal", "Poor", "Recommend Repair"],
  };
  const materialOptions = {
    label: "Material",
    name: "material",
    options: [
      "Stone",
      "Slate",
      "Block/Brick",
      "Fiberboard",
      "Fiber-cement",
      "Stucco",
      "Aluminum/Steel",
      "Asphalt",
      "Wood",
      "Metal/Vinyl",
    ],
  };
  const Options = [materialOptions, conditionOptions, screensOptions];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Windows Screens</p>

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
            <Editor label={"Comments"} value={value} onChange={onChange} comment={comments?.windowScreens}/>
          )}
        />

        <FormFieldsCreator extra={extra} setExtra={setExtra} />
        <ImageContainer setPhotos={setPhotos} photos={data?.photos} />
        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default WindowsScreens;
