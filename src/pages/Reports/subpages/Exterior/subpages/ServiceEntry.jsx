import React, { useState,useEffect } from "react";

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

function ServiceEntry({ toggleRefresh, exterior ,comments}) {
  const [data, setData] = useState(exterior.serviceEntry);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, exteriorId } = useParams();
  const { register, handleSubmit, setValue, control ,watch} = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      serviceEntry: { ...data, extra: extra },
    };
    await updatePropertyReq(id, exteriorId, reqData,'exterior', "serviceEntry", photos)
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
          setData(res.serviceEntry);
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
    options: ["Underground", "Overhead"],
  };

  const conditionOptions = {
    label: "Condition",
    name: "condition",
    options: [
      "Satisfactory",
      "Marginal",
      "Poor",
      "Weather head/mast needs repair",
      "Overhead wires too low",
    ],
  };
  const exteriorReceptaclesOptions = {
    label: "Exterior receptacles present",
    name: "exteriorReceptacles",
    options: [
      "Yes",
      "No"
    ],
  };
  const EROperableOptions ={
    label: "Operable",
    name: "operable",
    options: [
      "Yes",
      "No",
    ],
  }
  const ERConditionOptions ={
    label: "Condition",
    name: "condition",
    options: [
      "Satisfactory",
      "Marginal",
      "Poor",
    ],
  }
  const GFCIOptions = {
    label:'GFCI present',
    name:'gfci',
    options:['Yes', 'No']
  }
  let Options = [
    locationOptions,
    conditionOptions,
    exteriorReceptaclesOptions,
    GFCIOptions
  ];
  if(watch('exteriorReceptacles')=='Yes'){
    // Options.push(EROperableOptions)
    Options = [
      locationOptions,
      conditionOptions,
      exteriorReceptaclesOptions,
      EROperableOptions,
      GFCIOptions
    ]
  }
  if(watch('operable')=='Yes' && watch('exteriorReceptacles')=='Yes'){
    // Options.push(ERConditionOptions)
    Options = [
      locationOptions,
      conditionOptions,
      exteriorReceptaclesOptions,
      EROperableOptions,
      ERConditionOptions,
      GFCIOptions
    ]
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Service Entry</p>

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
            <Editor label={"Comments"} value={value} onChange={onChange} comment={comments?.serviceEntry}/>
          )}
        />

        <FormFieldsCreator extra={extra} setExtra={setExtra} />
        <ImageContainer setPhotos={setPhotos} photos={data?.photos} />
        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default ServiceEntry;
