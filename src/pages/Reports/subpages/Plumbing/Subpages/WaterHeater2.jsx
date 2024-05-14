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

function WaterHeater2({ toggleRefresh, plumbingData, comments }) {
  const [data, setData] = useState(plumbingData.waterHeater2);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, plumbingId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      waterHeater2: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      plumbingId,
      reqData,
      "plumbing",
      "waterHeater2",
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
      label: "Brand Name",
      name: "brandName",
      options: ["Rheem", "Sears", "State", "A.O. Smith"],
    },
    {
      label: "Serial #",
      name: "serial",
      options: [""],
    },
    {
      label: "Capacity",
      name: "capacity",
      options: ["30", "40", "50", "52", "55", "60", "80", "80+"],
    },
    {
      label: "Approx. age",
      name: "approxAge",
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
      label: "Type",
      name: "type",
      options: ["Gas", "Electric", "Oil", "LP", "Other"],
    },
    {
      label: "Combustion air venting present",
      name: "combuctionAirVent",
      options: ["Yes", "No", "N/A"],
    },
    {
      label: "Seismic restraints needed",
      name: "seismicRestraintsNeeded",
      options: ["Yes", "No", "N/A"],
    },
    {
      label: "Relief",
      name: "relief",
      options: ["Yes", "No", "N/A"],
    },
    {
      label: "Extension proper",
      name: "extensionProper",
      options: [
        "Yes",
        "No",
        "Missing",
        "Recommend repair",
        "Improper material",
      ],
    },
    {
      label: "Vent Pipe",
      name: "ventPipe",
      options: [
        "N/A",
        "Satisfactory",
        "Pitch proper",
        "Improper",
        "Rusted",
        "Recommend repair",
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
        <p className="headTitle">WaterHeater2</p>

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
              comment={comments?.waterHeater2}
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

export default WaterHeater2;
