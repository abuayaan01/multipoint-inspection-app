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

function LandscapingFoundation({ toggleRefresh, groundData,comments }) {
  const [data, setData] = useState(groundData.landscapingAffectingFoundation);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const { id, groundId } = useParams();
  const [extra, setExtra] = useState([]);

  const inspectionId = id;
  const { register, handleSubmit, control, setValue } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const reqData = {
      landscapingAffectingFoundation: { ...data, extra: extra },
    };
    await updatePropertyReq(
      inspectionId,
      groundId,
      reqData,
      'grounds',
      "landscapingAffectingFoundation",
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
          setData(res.landscapingAffectingFoundation);
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
    options: ["N/A", "Not visible"],
  };
  const gradeOptions = {
    label: "Negative Grade",
    name: "negativeGrade",
    options: [
      "East",
      "West",
      "North",
      "South",
      "Satisfactory",
      "Recommended additional backfill",
      "Recommended window wells/covers",
      "Trim back trees/shrubberies",
      "Wood in contact with/improper clearance to soil",
    ],
  };

  const serviceWalksCheckboxes = [gradeOptions];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Landscaping Foundation</p>

        <div className="mt-5">
          {serviceWalksCheckboxes.map((CheckElem, idx) => {
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
            <Editor label={"Comments"} value={value} onChange={onChange} comment={comments?.landscaoingAffectingFoundation}/>
          )}
        />
        <FormFieldsCreator extra={extra} setExtra={setExtra} />
        <ImageContainer setPhotos={setPhotos} photos={data?.photos} />
        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default LandscapingFoundation;
