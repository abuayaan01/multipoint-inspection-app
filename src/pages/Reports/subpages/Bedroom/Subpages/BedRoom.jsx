import React, { useState, useEffect } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Input from "../../../../../components/Input";
import Editor from "../../../../../components/Editor";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";

function BedRoom({ toggleRefresh, BedRoomData, comments }) {
  const [data, setData] = useState(BedRoomData.bedroom);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, bedroomId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      bedroom: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      bedroomId,
      reqData,
      "bedroom",
      "bedroom",
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
          setData(res.response);
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
      "First floor",
      "Second floor",
      "Third floor",
      "Fourth floor",
      "Basement",
      "Unit 1",
      "Unit 2",
      "Unit 3",
      "Unit 4",
      "North",
      "South",
      "East",
      "West",
      "NW",
      "SW",
      "NE",
      "SE",
    ],
  };

  const wallsAndCeillingOptions = {
    label: "Walls And Ceilling",
    name: "wallsAndCeilling",
    options: ["Satisfactory", "Marginal", "Poor", "Typical cracks", "Damage"],
  };

  const moistureStainsOptions = {
    label: "Moisture Stains",
    name: "moistureStains",
    options: ["Yes", "No"],
  };

  const floorOptions = {
    label: "Floor",
    name: "floor",
    options: [
      "Satisfactory",
      "Marginal",
      "Poor",
      "Squeaks",
      "Slopes",
      "Tripping hazard",
    ],
  };

  const ceilingFanOptions = {
    label: "Ceiling Fan",
    name: "ceilingFan",
    options: [
      "None",
      "Satisfactory",
      "Marginal",
      "Poor",
      "Recommend repair/replace",
    ],
  };

  const electricalOptions = {
    label: "Electrical",
    name: "electrical",
    options: [
      "Operable Switches",
      "Non Operable Switches",
      "Operable Receptacles",
      "Non operable Receptacles",
      "Open ground/Reverse polarity",
      "Safety hazard",
      "Cover plates missing",
    ],
  };

  const heatingSourceOptions = {
    label: "Heating Source",
    name: "heatingSource",
    options: [
      "Yes",
      "No",
      "Holes in doors",
      "Holes in walls",
      "Holes in ceillings",
    ],
  };

  const doorsOptions = {
    label: "Doors",
    name: "doors",
    options: [
      "None",
      "Satisfactory",
      "Marginal",
      "Poor",
      "Cracked glass",
      "Broken/Missing hardware",
    ],
  };

  const windowOptions = {
    label: "Window",
    name: "window",
    options: [
      "None",
      "Satisfactory",
      "Marginal",
      "Poor",
      "Cracked glass",
      "Evidence of leaking insulated glass",
      "Broken/Missing hardware",
    ],
  };

  const Options = [
    locationOptions,
    wallsAndCeillingOptions,
    moistureStainsOptions,
    floorOptions,
    ceilingFanOptions,
    electricalOptions,
    heatingSourceOptions,
    doorsOptions,
    windowOptions,
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Bedroom</p>

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
              comment={comments?.BedRoom}
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

export default BedRoom;