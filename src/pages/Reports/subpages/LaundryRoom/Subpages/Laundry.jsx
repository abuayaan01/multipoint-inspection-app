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

function Laundry({ toggleRefresh, laundryRoomData, comments }) {
  const [data, setData] = useState(laundryRoomData.laundry);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, laundryRoomId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      laundry: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      laundryRoomId,
      reqData,
      "laundryRoom",
      "laundry",
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

  const laudrySinkOptions = {
    label: "Laudry Sink",
    name: "laudrySink",
    options: ["N/A"],
  };
  const faucetLeaksOptions = {
    label: "Faucet leaks",
    name: "faucetLeaks",
    options: ["Yes", "No"],
  };
  const pipesLeaksOptions = {
    label: "Pipes Leaks",
    name: "pipesLeaks",
    options: ["Yes", "No", "Not Visible"],
  };
  const crossConnectionsOptions = {
    label: "Cross Connections",
    name: "crossConnections",
    options: ["Yes", "No", "Potential Safety Hazard"],
  };
  const heatSourcePresentOptions = {
    label: "Heat Source Present",
    name: "heatSourcePresent",
    options: ["Yes", "No"],
  };
  const roomVentedOptions = {
    label: "Room Vented",
    name: "roomVented",
    options: ["Yes", "No"],
  };
  const dryerVentedOptions = {
    label: "Dryer Vented",
    name: "dryerVented",
    options: [
      "N/A",
      "Wall",
      "Ceiling",
      "Floor",
      "Not Vented",
      "Plastic dryer vent not recommended",
      "Not Vented to exterior",
      "Recommend repair",
      "Safety Hazard",
    ],
  };
  const electricalOptions = {
    label: "Electrical",
    name: "electrical",
    options: ["Open ground/reverse polarity", "Safety hazard"],
  };

  const GFCIOptions = {
    label: "GFCI Present",
    name: "GFCIPresent",
    options: [
      "Yes",
      "No",
      "Operable",
      "Non Operable",
      "Recommend GFCI Receptacles",
    ],
  };

  const appliancesOptions = {
    label: "Appliances",
    name: "appliances",
    options: ["Washer", "Dryer", "Water heater", "Furnace/Boiler"],
  };

  const washerHookUpLinesValvesOptions = {
    label: "Washer hook-up lines valves",
    name: "washerHookUpLinesValves",
    options: ["Satisfactory", "Leaking", "Corroded", "Not Visible"],
  };

  const gasShutOffValveOptions = {
    label: "Gas shut off valve",
    name: "gasShutOffValve",
    options: ["N/A", "Yes", "No", "Cap Needed", "Safety hazard", "Not visible"],
  };

  const Options = [
    laudrySinkOptions,
    faucetLeaksOptions,
    pipesLeaksOptions,
    crossConnectionsOptions,
    heatSourcePresentOptions,
    roomVentedOptions,
    dryerVentedOptions,
    electricalOptions,
    GFCIOptions,
    appliancesOptions,
    washerHookUpLinesValvesOptions,
    gasShutOffValveOptions,
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Laundry</p>

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
              comment={comments?.laundry}
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

export default Laundry;
