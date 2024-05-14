import React, { useEffect, useState } from "react";
import { updateDeatilsReq } from "../../../../services/api";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Textarea from "../../../../components/Textarea";
import SaveButton from "../../../../components/SaveButton";
import Swal from "sweetalert2";
import { useComponent } from "../../../../Context/ComponentContext";
import FormFieldsCreator from "./../../../../components/FormFieldsCreator";

function PropertyDetails({ toggleRefresh, property, id }) {
  const { setCurrentComponentName } = useComponent();
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);

  useEffect(() => {
    setCurrentComponentName("Property");
  }, [setCurrentComponentName]);

  const { register, handleSubmit, setValue, control } = useForm();
  const onSubmit = async (data) => {
    await updateDeatils(data);
  };

  useEffect(() => {
    for (const key in property) {
      if (property.hasOwnProperty(key)) {
        if (property[key].length != 0) {
          setValue(key, property[key]);
        }
      }
    }
    if (property?.extra) {
      console.log(property?.extra);
      setExtra(property?.extra);
    } else {
      setExtra([]);
    }
  }, [setValue, property]);
  const updateDeatils = async (fomrData) => {
    setLoading(true);
    const data = {
      property: { ...fomrData, extra: extra },
    };
    await updateDeatilsReq(id, data).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success", // You can use 'success', 'error', 'warning', 'info', etc.
          title: "Saved",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        toggleRefresh();
      }
      setLoading(false);
    });
  };

  const typeOptions = [
    "",
    "Single Family",
    "Multi Family",
    "Apartment",
    "Condominium",
    "Townhouse",
  ];
  const styleOptions = ["", "1 Story", "1 1/2 Story", "2 Story", "High Rise"];
  const slabOnGradeOptions = ["", "Full", "Partial", "None"];
  const qtyOptions = ["", "1", "2", "3", "4"];
  const fuelOptions = ["", "Electric", "Gas", "Oil"];
  const garageOptions = ["", "1 Car", "2 Car", "3 Car", "4 Car"];

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="editForm flex flex-wrap"
      >
        <Controller
          name="type"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label={"Type"} field={field} options={typeOptions} />
          )}
        />

        <Controller
          name="style"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label={"Style"} field={field} options={styleOptions} />
          )}
        />

        <Input
          label={"Size (sq ft)"}
          name={"size"}
          register={register}
          required={true}
        />

        <Input
          label={"Sale Price ($)"}
          name={"salePrice"}
          register={register}
        />

        <Input type={"number"} label={"Year Built"} name={"yearBuilt"} register={register} required={true} />

        {/* <Textarea label={"Scope of inspection :"} name={"scopeOfInspection"} register={register} /> */}

        <Controller
          name="fireplaces"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label={"Fireplace(s)"} field={field} options={qtyOptions} />
          )}
        />

        <Controller
          name="slabOnGrade"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label={"Slab on grade"}
              field={field}
              options={slabOnGradeOptions}
            />
          )}
        />

        <Controller
          name="furnace"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label={"Furnace(s)"} field={field} options={qtyOptions} />
          )}
        />

        <Controller
          name="furnaceFuel"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label={"Furnace Fuel"}
              field={field}
              options={fuelOptions}
            />
          )}
        />

        <Controller
          name="acUnit"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label={"A/C Unit(s)"} field={field} options={qtyOptions} />
          )}
        />

        <Controller
          name="utilities"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label={"Utilities"} field={field} options={["Off", "On"]} />
          )}
        />

        <Controller
          name="waterHeater"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label={"Water Heater(s)"} field={field} options={qtyOptions} />
          )}
        />

        <Controller
          name="waterHeaterFuel"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label={"Water Heater Fuel"}
              field={field}
              options={fuelOptions}
            />
          )}
        />

        <Controller
          name="garage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label={"Garage"} field={field} options={garageOptions} />
          )}
        />

        <Textarea label={"Notes :"} name={"notes"} register={register} />
        
        <div className="w-full">
          <FormFieldsCreator extra={extra} setExtra={setExtra} />
        </div>

        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default PropertyDetails;
