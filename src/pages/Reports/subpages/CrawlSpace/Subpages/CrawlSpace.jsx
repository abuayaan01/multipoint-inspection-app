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

function CrawlSpace({ toggleRefresh, crawlSpaceData, comments }) {
  const [data, setData] = useState(crawlSpaceData.crawlSpace);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id, crawlSpaceId } = useParams();
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let reqData = {
      crawlSpace: { ...data, extra: extra },
    };
    await updatePropertyReq(
      id,
      crawlSpaceId,
      reqData,
      "crawlSpace",
      "crawlSpace",
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

  const options1 = {
    label: "Availability",
    name: "availability",
    options: ["N/A"],
  };

  const options2 = {
    label: "Type",
    name: "type",
    options: ["Full crawlspace", "Combination basement/crawl space/slab"],
  };
  const options3 = {
    label: "Condiiton(heated/cooled)",
    name: "condition",
    options: ["Yes", "No"],
  };

  const Options = [options1, options2, options3];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="editForm">
        <p className="headTitle">Crawlspace</p>

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
              comment={comments?.crawlSpace}
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

export default CrawlSpace;
