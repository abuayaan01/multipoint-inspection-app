import React, { useState } from "react";
import Editor from "../../../../components/Editor";
import Input from "../../../../components/Input";
import SaveButton from "../../../../components/SaveButton";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { updateOverviewReq } from "../../../../services/api";
import { useComponent } from "../../../../Context/ComponentContext";

function Overview({ toggleRefresh, id, overviewData, comments }) {
  const { setCurrentComponentName } = useComponent();
  const { register, handleSubmit, setValue, control } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const overview = data;
    // console.log(data);
    await updateOverviewReq(id, overview).then((res) => {
      console.log(res);
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
  useEffect(() => {
    setCurrentComponentName("Overview");
  }, []);

  useEffect(() => {
    for (const key in overviewData) {
      if (overviewData.hasOwnProperty(key)) {
        setValue(key, overviewData[key]);
      }
    }
  }, [setValue, overviewData]);

  function calculateAge(yearBuilt) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearBuilt;
    return age;
  }

  return (
    <>
      <form className="editForm" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="scopeOfInspection"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Scope Of Inspection"}
              value={value}
              onChange={onChange}
              comment={comments?.scopeOfInspection}
            />
          )}
        />
        <Controller
          name="mainEntranceFaces"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Main Entrance Faces"}
              value={value}
              onChange={onChange}
              comment={comments?.mainEntranceFaces}
            />
          )}
        />
        <Controller
          name="stateOfOccupancy"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"State of Occupancy"}
              value={value}
              onChange={onChange}
              comment={comments?.stateOfOccupancy}
            />
          )}
        />
        <Controller
          name="weatherConditions"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Weather Conditions"}
              value={value}
              onChange={onChange}
              comment={comments?.weatherConditions}
            />
          )}
        />
        <Controller
          name="recentRain"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Recent Rain"}
              value={value}
              onChange={onChange}
              comment={comments?.recentRain}
            />
          )}
        />
        <Controller
          name="groundCover"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Ground Cover"}
              value={value}
              onChange={onChange}
              comment={comments?.groundCover}
            />
          )}
        />

        <div className="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0">
          <div className="mb-4">
            <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80">
              {"Approximate Age"}
            </label>
            <input
              type="text"
              name="approximateAge"
              value={calculateAge(overviewData?.yearBuilt) ? calculateAge(overviewData?.yearBuilt) : ''}
              className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
              {...register("approximateAge")}
            />
          </div>
        </div>

        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default Overview;
