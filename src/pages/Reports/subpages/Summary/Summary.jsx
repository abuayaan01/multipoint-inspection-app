import React, { useState } from "react";
import Editor from "../../../../components/Editor";
import SaveButton from "../../../../components/SaveButton";
import { useForm, Controller } from "react-hook-form";
import { updateSummaryReq } from "../../../../services/api";
import Swal from "sweetalert2";
import { useComponent } from "../../../../Context/ComponentContext";
import { useEffect } from "react";

function Summary({ toggleRefresh, id, summaryData, comments }) {
  console.log(comments);
  const { setCurrentComponentName } = useComponent();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, control, errors } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const summary = data;
    await updateSummaryReq(id, summary).then((res) => {
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
    setCurrentComponentName("Summary");
  }, []);

  useEffect(() => {
    for (const key in summaryData) {
      if (summaryData.hasOwnProperty(key)) {
        setValue(key, summaryData[key]);
      }
    }
  }, [setValue, summaryData]);

  return (
    <>
      {/* <span className="tabHeading" htmlFor="">Summary</span> */}
      <form className="editForm" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="itemNotOperating"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Items Not Operating"}
              value={value}
              onChange={onChange}
              comment={comments?.itemsNotOperating}
            />
          )}
        />
        <Controller
          name="majorConcerns"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Major Concerns"}
              value={value}
              onChange={onChange}
              comment={comments?.majorConcern}
            />
          )}
        />
        <Controller
          name="potentialSafetyHazards"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Potential Safety Hazards"}
              value={value}
              onChange={onChange}
              comment={comments?.potentialSafetyHazards}
            />
          )}
        />
        <Controller
          name="defferedCostItems"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Deffered Cost Items"}
              value={value}
              onChange={onChange}
              comment={comments?.defferedConstItems}
            />
          )}
        />
        <Controller
          name="improvementItems"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Improvement Items"}
              value={value}
              onChange={onChange}
              comment={comments?.improvementItems}
            />
          )}
        />
        <Controller
          name="itemsToMonitor"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor
              label={"Items To Monitor"}
              value={value}
              onChange={onChange}
              comment={comments?.itemsToMonitor}
            />
          )}
        />

        <SaveButton loading={loading} />
      </form>
    </>
  );
}

export default Summary;
