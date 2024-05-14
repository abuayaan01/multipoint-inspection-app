import React, { useState, useEffect } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";

import Input from "../../../../../components/Input";

import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";

function EvaporatorCoilSectionUnit2({
  toggleRefresh,
  electricCoolingSystemData,
  comments,
}) {
  const [data, setData] = useState(
    electricCoolingSystemData.evaporatorCoilSectionUnit2
  );
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, electricCoolingSystemId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      evaporatorCoilSectionUnit2: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      electricCoolingSystemId,
      reqData,
      "electricCoolingSystem",
      "evaporatorCoilSectionUnit2",
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
      label: "General",
      name: "general",
      options: ["Central system", "Wall unit"],
    },
    {
      label: "Age",
      name: "generalAge",
      options: [
        "Unknown",
        "Older",
        "1-5+",
        "5-10+",
        "10-15+",
        "15-20+",
        "20-25+",
        "25+",
      ],
    },
    {
      label: "Evaporated coil",
      name: "evaporatedCoil",

      options: ["Satisfactory", "Not visible", "Needs cleaning", "Damaged"],
    },
    {
      label: "Refrigerant lines",
      name: "refrigerantLines",
      options: [
        "Leak/Oil present",
        "Not Damage",
        "Insulation missing",
        "Satisfactory",
      ],
    },
    {
      label: "Condensate line/drain",
      name: "condensateLineDrain",

      options: ["To exterior", "To pump", "Floor drain", "Other"],
    },
    {
      label: "Secondary Condensate line/Drain",
      name: "condensateLineDrain",
      options: [
        "Present",
        "Needed",
        "Primary pan appears clogged",
        "Recommend technician evalute",
      ],
    },
    {
      label: "Condition",
      name: "condition",
      options: [
        "Satisfactory",
        "Marginal",
        "Poor",
        "Recommend HVAC technician examine/clean/service",
        "Not operated due to exterior temperature",
      ],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Evaporator Coil Section Unit #2</p>

        <div className="mt-5">
          {Options.map((CheckElem, idx) => {
            return (
              <>
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
                  {idx == 1 && (
                    <Input
                      label={"Location"}
                      name={"location"}
                      register={register}
                    />
                  )}
                </div>
              </>
            );
          })}
        </div>

        <Input
          label={"Operation - Differential"}
          name={"oprationDifferential"}
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
              comment={comments?.evaporatorCoilSectionUnit2}
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

export default EvaporatorCoilSectionUnit2;
