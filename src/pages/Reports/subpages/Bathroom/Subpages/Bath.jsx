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

function Bath({ toggleRefresh, bathroomData, comments }) {
  const [data, setData] = useState(bathroomData?.bath);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, bathroomId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      bath: { ...data, extra: extra },
    };
    await updatePropertyReq(id, bathroomId, reqData, "bathroom", "bath", photos)
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

  const locationOptions = {
    label: "Location",
    name: "location",
    options: [
      "Master bath",
      "First floor bath",
      "First floor half bath",
      "Second floor",
      "Basement bath",
      "basement half bath",
      "Unit 1",
      "Unit 2",
      "Unit 3",
      "Unit 4",
    ],
  };

  const sinksOptions = {
    label: "Sinks",
    name: "sinks",
    options: ["Faucet leaks", "Pipes leak"],
  };

  const tubsOptions = {
    label: "Tubs",
    name: "tubs",
    options: ["N/A", "Faucet leaks", "Pipes leak"],
  };

  const showerOptions = {
    label: "Showers",
    name: "showers",
    options: ["N/A", "Faucet leaks", "Pipes leak"],
  };

  const toiletOptions = {
    label: "Toilet",
    name: "toilet",
    options: [
      "Bowl loose",
      "Operable",
      "Non operable",
      "Cracked bowl",
      "Toilet leaks",
    ],
  };

  const whirlpoolOptions = {
    label: "Whirlpool",
    name: "whirlpool",
    options: [
      "Yes",
      "No",
      "Operable",
      "Non operable",
      "Not tested",
      "No access door",
      "GFCI",
      "GFCI Recommended",
    ],
  };

  const showerTubAreaOptions = {
    label: "Shower Tub Area",
    name: "showerTubArea",
    options: [
      "Ceramic/Plastic",
      "Fiberglass",
      "Masonite",
      "Satisfactory",
      "Marginal",
      "Poor",
      "Rotted floors",
      "Caulk/Grouting needed",
      "N/A",
    ],
  };

  const drainageOptions = {
    label: "Drainage",
    name: "drainage",
    options: ["Satisfactory", "Marginal", "Poor"],
  };

  const waterflowOptions = {
    label: "Water flow",
    name: "waterflow",
    options: ["Satisfactory", "Marginal", "Poor"],
  };

  const doorsOptions = {
    label: "Doors",
    name: "doors",
    options: ["Satisfactory", "Marginal", "Poor"],
  };

  const windowOptions = {
    label: "Window",
    name: "window",
    options: ["None", "Satisfactory", "Marginal", "Poor"],
  };

  const receptaclesOptions = {
    label: "Receptacles Present",
    name: "receptaclesPresent",
    options: ["Yes", "No", "Operable", "Non Operable"],
  };

  const GFCIOptions = {
    label: "GFCI",
    name: "GFCI",
    options: ["Yes", "No", "Operable", "Non Operable", "Recommend GFCI"],
  };

  const openGroundPolarityOptions = {
    label: "Open Ground/Reverse Polarity",
    name: "openGroundReversePolarity",
    options: ["Yes", "No", "Potential Safety Hazard"],
  };

  const exhaustOptions = {
    label: "Exhaust Fan",
    name: "exhaustFan",
    options: ["Yes", "No", "Operable", "Non Operable", "Noisy"],
  };

  const Options = [
    locationOptions,
    sinksOptions,
    tubsOptions,
    showerOptions,
    toiletOptions,
    whirlpoolOptions,
    showerTubAreaOptions,
    drainageOptions,
    waterflowOptions,
    doorsOptions,
    windowOptions,
    receptaclesOptions,
    GFCIOptions,
    openGroundPolarityOptions,
    exhaustOptions,
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Bath</p>

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
              comment={comments?.bath}
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

export default Bath;
