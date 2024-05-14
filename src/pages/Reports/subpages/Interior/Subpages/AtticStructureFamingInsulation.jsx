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

function AtticStructureFamingInsulation({
  toggleRefresh,
  interiorData,
  comments,
}) {
  const [data, setData] = useState(interiorData.atticStructureFamingInsulation);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, interiorId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      atticStructureFamingInsulation: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      interiorId,
      reqData,
      "interior",
      "atticStructureFamingInsulation",
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
      label: "Access",
      name: "access",
      options: [
        "Stairs",
        "Pulldown",
        "Scuttlehole/Hatch",
        "No Access",
        "Access limited",
      ],
    },
    {
      label: "Inspected from",
      name: "inspectedFrom",
      options: ["Access panel", "In the attic", "Other"],
    },
    {
      label: "Location",
      name: "location",
      options: ["Hallway", "Bedroom Closet", "Garage", "Other"],
    },
    {
      label: "Flooring",
      name: "flooring",
      options: ["Complete", "Partial", "None"],
    },
    {
      label: "Insulation",
      name: "insulation",
      options: [
        "Fiberglass",
        "Batts",
        "Loose",
        "Cellulose",
        "Foam",
        "Other",
        "Vermiculite",
        "Rock wool",
        "Damaged",
        "Displaced",
        "Missing",
        "Compressed",
        "Recommend additional insulation",
      ],
    },
    {
      label: "Installed in",
      name: "installedIn",
      options: [
        "Rafters/Trusses",
        "Walls",
        "Between ceiling joists",
        "Underside of roof deck",
        "Not Visible",
      ],
    },
    {
      label: "Vapor barriers",
      name: "vaporBarriers",
      options: [
        "Kraft/foil faced",
        "Plastic sheeting",
        "Not Visible",
        "Improperly installed",
      ],
    },
    {
      label: "Ventilation",
      name: "ventilation",
      options: [
        "Ventilation appears adequate",
        "Recommend additional ventilation",
        "Recommend baffles at eaves",
      ],
    },
    {
      label: "Fans exhasted to",
      name: "fansExhastedTo",
      options: ["Attic", "Outside", "Not Visible"],
    },
    {
      label: "HVAC Duct",
      name: "HVACDuct",
      options: [
        "N/A",
        "Satisfactory",
        "Damaged",
        "Split",
        "Disconnected",
        "Leaking",
        "Repair/Replace",
        "Recommend Insulation",
      ],
    },
    {
      label: "Chimney chase",
      name: "chimneyChase",
      options: ["N/A", "Satisfactory", "Needs repair", "Not Visible"],
    },
    {
      label: "Structural problems observed",
      name: "structuralProblems",
      options: [
        "Yes",
        "No",
        "Recommend repair",
        "Recommend structural engineer",
      ],
    },
    {
      label: "Roof Structure",
      name: "roofStructure",
      options: [
        "Rafters",
        "Trusses",
        "Wood",
        "Metal",
        "Collar ties",
        "Purlins",
        "Knee wall",
        "Not Visible",
      ],
    },
    {
      label: "Ceiling joists",
      name: "ceilingJoists",
      options: ["Wood", "Metal", "Not Visible"],
    },
    {
      label: "Sheathing",
      name: "sheathing",
      options: [
        "Plywood",
        "OSB",
        "Planking",
        "Rotted",
        "Stained",
        "Delaminated",
      ],
    },
    {
      label: "Evidence of condensation",
      name: "EvidenceOfCondensation",
      options: ["Yes", "No"],
    },
    {
      label: "Evidence of moisture",
      name: "EvidenceOfMoisture",
      options: ["Yes", "No"],
    },
    {
      label: "Evidence of leaking",
      name: "EvidenceOfLeaking",
      options: ["Yes", "No"],
    },
    {
      label: "Firewall between units",
      name: "firewallBetweenUnits",
      options: ["N/A", "Yes", "No", "Needs repair/sealing"],
    },
    {
      label: "Electrical",
      name: "chimneyChase",
      options: [
        "No apparent defects",
        "Open junction box(es)",
        "Handyman wiring",
        "Knob and tube covered with insulation",
        "Safety Hazard",
      ],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Attic/Structure/Framing/Insulation</p>

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
              comment={comments?.atticStructureFamingInsulation}
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

export default AtticStructureFamingInsulation;
