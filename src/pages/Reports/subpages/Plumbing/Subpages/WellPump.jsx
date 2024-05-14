import React, { useState, useEffect } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import Input from "../../../../../components/Input";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";

function WellPump({ toggleRefresh, plumbingData, comments }) {
  const [data, setData] = useState(plumbingData.wellPump);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, plumbingId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      wellPump: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      plumbingId,
      reqData,
      "plumbing",
      "wellPump",
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
      options: ["N/A"],
    },
    {
      label: "Type",
      name: "type",
      options: [
        "Submersible",
        "In basement",
        "Well house",
        "Well pit",
        "Shared well",
      ],
    },
    {
      label: "Pressure gauge operable",
      name: "pressureGaugeOperable",
      options: ["Yes", "No", "Not Visible"],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Well Pump</p>

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

        <Input
          label={"Well pressure"}
          name={"wellPressure"}
          register={register}
        />
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
              comment={comments?.wellPump}
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

export default WellPump;
