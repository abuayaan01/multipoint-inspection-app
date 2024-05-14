import React, { useState, useEffect } from "react";
import CustomCheckboxGroup from "../../../../../components/CheckboxGroup";
import Editor from "../../../../../components/Editor";
import FormFieldsCreator from "../../../../../components/FormFieldsCreator";
import ImageContainer from "../../../../ImageSelector/ImageContainer";
import SaveButton from "../../../../../components/SaveButton";
import { updatePropertyReq } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";

function Fireplace({ toggleRefresh, interiorData, comments }) {
  const [data, setData] = useState(interiorData.fireplace);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, interiorId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      fireplace: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      interiorId,
      reqData,
      "interior",
      "fireplace",
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
      label: "Location",
      name: "location",
      options: [
        "Living room",
        "Family room",
        "Dining room",
        "Master bedroom",
        "Bedroom",
      ],
    },
    {
      label: "Type",
      name: "type",
      options: [
        "Gas",
        "Wood",
        "Solid fuel burning stove",
        "Electric",
        "Ventless",
      ],
    },
    {
      label: "Material",
      name: "material",
      options: [
        "Masonry",
        "Metal (pre-fabricated)",
        "Metal insert",
        "Cast Iron",
      ],
    },
    {
      label: "Miscellaneous",
      name: "miscellaneous",
      options: [
        "Blower built-in",
        "Blower Operable",
        "Blower Not Operable",
        "Damper Operable",
        "Damper Not Operable",
        "Open joints or cracks in firebrick/panels should be sealed",
        "Fireplace doors need repair",
      ],
    },
    {
      label: "Damper modified for gas operation",
      name: "dampermodifiedforgasoperation",
      options: ["N/A", "Yes", "No", "Damper missing"],
    },
    {
      label: "Hearth extension adequate",
      name: "hearthextensionadequate",
      options: ["Yes", "No"],
    },
    {
      label: "Mantel",
      name: " mantel",
      options: ["N/A", "Secure", "Loose", "Rcommemd repair/replace"],
    },
    {
      label: "Physical condition",
      name: "physicalcondition",
      options: [
        "Satisfactory",
        "Marginal",
        "Poor",
        "Recommend having flue cleaned and re-examined",
        "Not evaluated",
      ],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Fireplace</p>

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

        <Controller
          name="comments"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Comments"}
              value={value}
              onChange={onChange}
              comment={comments?.fireplace}
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

export default Fireplace;
