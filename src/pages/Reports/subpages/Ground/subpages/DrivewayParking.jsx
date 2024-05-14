import React, { useState, useEffect } from "react";
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

function DrivewayParking({ toggleRefresh, groundData ,comments}) {
  const [data, setData] = useState(groundData.drivewayParking);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const { id, groundId } = useParams();
  const [extra, setExtra] = useState([]);

  const inspectionId = id;
  const { register, handleSubmit, control, setValue } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const reqData = { drivewayParking: { ...data, extra: extra } };
    await updatePropertyReq(
      inspectionId,
      groundId,
      reqData,
      'grounds',
      "drivewayParking",
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
          setData(res.drivewayParking);
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
    options: ["None", "Not visible"],
  };
  const materialOptions = {
    label: "Material",
    name: "material",
    options: ["Concrete", "Asphalt", "Gravel/Dirt", "Brick"],
  };
  const conditionOptions = {
    label: "Condition",
    name: "condition",
    options: [
      "Satisfactory",
      "Marginal",
      "Poor",
      "Trip hazard",
      "Typical cracks",
      "Pitched towards home",
      "Settling cracks",
      "Fill cracks and seal",
    ],
  };

  const serviceWalksCheckboxes = [
    visibiltyOptions,
    materialOptions,
    conditionOptions,
  ];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="text-slate-700 text-center leading-normal uppercase text-md">
          Driveway/Parking
        </p>

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
            <Editor label={"Comments"} value={value} onChange={onChange} comment={comments?.drivingParking}/>
          )}
        />
        <FormFieldsCreator extra={extra} setExtra={setExtra} />
        <ImageContainer setPhotos={setPhotos} photos={data?.photos} />
        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default DrivewayParking;
