import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import SaveButton from "../../components/SaveButton";
import { useForm, Controller } from "react-hook-form";
import imageLogo from "../../assets/imageUpload.png";
import { updateAdminsReq, getAdminReq, base_url } from "../../services/api";
import Swal from "sweetalert2";
import Compressor from "compressorjs";

function Administration() {
  const [adminData, setAdminData] = React.useState([]);
  const [loading, setloading] = useState(false);
  const [refresh,setRefresh] = useState(false);

  React.useEffect(() => {
    getAdminReq(localStorage.getItem("userId"))
      .then((res) => setAdminData(res.admin))
      .catch((error) => console.error(error));
  }, [refresh]);

  const CompanyInfo = () => {
    const { register, handleSubmit, setValue } = useForm();
    const fileInputRef = React.useRef(null);
    const [companyLogo, setCompanyLogo] = React.useState();
    const [logo, setLogo] = React.useState(adminData.companyInfo?.companyLogo ?
      `${base_url}/uploads/${adminData.companyInfo?.companyLogo}` : imageLogo
    );

    const onSubmit = async (data) => {
      setloading(true);
      updateAdminsReq(localStorage.getItem("userId"), "companyInfo", {
        ...data,
        companyLogo: companyLogo,
      })
        .then((res) => {
          setloading(false);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Saved",
              toast: true,
              position: "top-end",
              timer: 3000,
              showConfirmButton: false,
            });
            setRefresh(!refresh);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error Saving Information",
              toast: true,
              position: "top-end",
              timer: 3000,
              showConfirmButton: false,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setloading(false);
        });
    };

    React.useEffect(() => {
      for (const key in adminData?.companyInfo) {
        if (adminData?.companyInfo.hasOwnProperty(key)) {
          setValue(key, adminData?.companyInfo[key]);
        }
      }
    }, [setValue, adminData]);

    const compressImage = (photo) => {
      return new Promise((resolve, reject) => {
        new Compressor(photo, {
          quality: 0.1,
          targetSize: 50 * 1024,
          success(result) {
            const compressedFile = new File([result], photo.name, {
              type: "image/jpeg",
            });
            resolve(compressedFile);
          },
          error(err) {
            console.error(err.message);
            reject(err);
          },
        });
      });
    };

    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const compressedFile = await compressImage(file);
          // console.log(compressedFile);
          setLogo(URL.createObjectURL(compressedFile));
          setCompanyLogo(compressedFile);
        } catch (error) {
          console.error("Compression Error:", error);
        }
      }
    };
    const handleClickImage = () => {
      fileInputRef.current.click();
    };

    const urlToFile = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log(blob);
      const filename = url.split("/").pop();
      return new File([blob], filename, { type: blob.type });
    };

    // useEffect(() => {
    //   console.log(adminData.companyInfo?.companyLogo);
    //   console.log(`${base_url}/uploads/${adminData.companyInfo?.companyLogo}`);
    // }, []);

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-wrap mt-4">
            <div className="flex flex-wrap">
              <Input
                label={"Company Name"}
                name={"companyName"}
                size={"sm"}
                register={register}
                required={true}
              />
              <Input
                label={"States/Provinces where agreement is not valid"}
                name={"spwainv"}
                size={"sm"}
                register={register}
              />
              <Input label={"Address"} name={"address"} register={register} />
              <Input
                label={"City"}
                name={"city"}
                size={"sm"}
                register={register}
              />
              <Input
                label={"State"}
                name={"state"}
                size={"sm"}
                register={register}
              />
              <Input
                label={"Country"}
                name={"country"}
                size={"sm"}
                register={register}
              />
              <Input
                label={"Zip / Postal Code"}
                name={"zipCode"}
                size={"sm"}
                type={"number"}
                register={register}
              />
              <Input
                label={"Phone"}
                name={"phone"}
                size={"sm"}
                register={register}
                type={"number"}
                required={true}
              />
              <Input
                label={"Website"}
                name={"website"}
                size={"sm"}
                register={register}
                required={true}
              />
            </div>

            <div className="bg-white p-5 my-5 shadow rounded-2xl flex flex-col">
              <p className="text-left my-2 text-slate-600 font-semibold">
                Set Company Logo
              </p>
              <div className="flex space-x-5 text-slate-600 text-sm justify-start items-center">
                <img
                  className="h-[100px] w-[100px] cursor-pointer rounded object-contain"
                  src={logo ? logo : imageLogo}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                  alt=""
                  onClick={handleClickImage}
                />

                <div className="">
                  <p>Choose image</p>
                  <p>JPG,GIF or PNG, Max size of 800kb</p>
                  <input
                    ref={fileInputRef}
                    className="mb-2 py-1 border-b-[2px] border-[#aaa]"
                    type="file"
                    name="logo"
                    placeholder="Company Logo"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>

            <div>
              <SaveButton loading={loading} />
            </div>
          </div>
        </form>
      </div>
    );
  };

  const InspectorInfo = () => {
    const { register, handleSubmit, setValue, control } = useForm();

    const onSubmit = async (data) => {
      setloading(true);
      updateAdminsReq(localStorage.getItem("userId"), "inspectorInfo", data)
        .then((res) => {
          setloading(false);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Saved",
              toast: true,
              position: "top-end",
              timer: 3000,
              showConfirmButton: false,
            });
            setRefresh(!refresh);
          } else {
            setloading(false);
            Swal.fire({
              icon: "error",
              title: "Error Saving Information",
              toast: true,
              position: "top-end",
              timer: 3000,
              showConfirmButton: false,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setloading(false);
        });
    };
    React.useEffect(() => {
      for (const key in adminData?.inspectorInfo) {
        if (adminData?.inspectorInfo.hasOwnProperty(key)) {
          setValue(key, adminData?.inspectorInfo[key]);
        }
      }
    }, [setValue, adminData]);

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-wrap mt-4">
            <div className="flex flex-wrap">
              <Input
                label={"First Name"}
                name={"firstName"}
                size={"sm"}
                register={register}
                required={true}
              />
              <Input
                label={"Last Name"}
                name={"lastName"}
                size={"sm"}
                register={register}
                required={true}
              />
              <Input
                label={"Email"}
                name={"email"}
                size={"sm"}
                type={"email"}
                register={register}
              />
              <Input
                label={"Phone"}
                name={"phone"}
                size={"sm"}
                type={"number"}
                register={register}
              />
              <Input label={"Address"} name={"address"} register={register} />
              <Input
                label={"City"}
                name={"city"}
                size={"sm"}
                register={register}
              />
              <Input
                label={"State"}
                name={"state"}
                size={"sm"}
                register={register}
              />
              <Input
                label={"Country"}
                name={"country"}
                size={"sm"}
                register={register}
              />
              <Input
                label={"Zip / Postal Code"}
                name={"zipCode"}
                size={"sm"}
                register={register}
                type={"number"}
              />
              <Input
                label={"License Number"}
                name={"licenseNumber"}
                size={"sm"}
                register={register}
                required={true}
              />
              <Input
                label={"State/Province"}
                name={"stateProvince"}
                size={"sm"}
                register={register}
              />
              <Controller
                name="licenseType"
                control={control}
                render={({ field }) => (
                  <Select
                    label={"License Type"}
                    field={field}
                    options={["", "HI", "BCI", "GBRC", "PE", "PA"]}
                  />
                )}
              />
              <Input
                label={"Signature"}
                name={"signature"}
                size={"sm"}
                register={register}
              />
            </div>
          </div>
          <div>
            <SaveButton loading={loading} />
          </div>
        </form>
      </div>
    );
  };

  const PdfSettings = () => {
    const [includeThankYou, setIncludeThankYou] = useState(adminData.pdfSettings?.thankYouPage || false);
    const fileInputRef = React.useRef(null);
    const [companyLogo, setCompanyLogo] = React.useState();
    const [logo, setLogo] = React.useState(adminData.pdfSettings?.coverImage ?
      `${base_url}/uploads/${adminData.pdfSettings?.coverImage}` : imageLogo
    );

    const { register, handleSubmit, setValue, control } = useForm();

    const onSubmit = async (data) => {
      console.log({...data,
        companyLogo: companyLogo,
        thankYouPage: includeThankYou,})
      setloading(true);
      updateAdminsReq(localStorage.getItem("userId"), "pdfSettings", {
        ...data,
        companyLogo: companyLogo,
        thankYouPage: includeThankYou,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Saved",
              toast: true,
              position: "top-end",
              timer: 3000,
              showConfirmButton: false,
            });
            setloading(false)
            setRefresh(!refresh);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error Saving Information",
              toast: true,
              position: "top-end",
              timer: 3000,
              showConfirmButton: false,
            });
            setloading(false);
          }
        })
        .catch((error) => {console.error(error);setloading(false)});
    };

    const handleCheckboxChange = () => {
      setIncludeThankYou(!includeThankYou);
    };

    const compressImage = (photo) => {
      return new Promise((resolve, reject) => {
        new Compressor(photo, {
          quality: 0.1,
          targetSize: 50 * 1024,
          success(result) {
            const compressedFile = new File([result], photo.name, {
              type: "image/jpeg",
            });
            resolve(compressedFile);
          },
          error(err) {
            console.error(err.message);
            reject(err);
          },
        });
      });
    };

    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const compressedFile = await compressImage(file);
          // console.log(compressedFile);
          setLogo(URL.createObjectURL(compressedFile));
          setCompanyLogo(compressedFile);
        } catch (error) {
          console.error("Compression Error:", error);
        }
      }
    };
    const handleClickImage = () => {
      fileInputRef.current.click();
    };

    React.useEffect(() => {
      for (const key in adminData?.pdfSettings) {
        if (adminData?.pdfSettings.hasOwnProperty(key)) {
          setValue(key, adminData?.pdfSettings[key]);
        }
      }
    }, [setValue, adminData]);

    const companyLogoPosition = [
      "",
      "Top-left",
      "Top-center",
      "Top-right",
      "Mid-left",
      "Mid-center",
      "Mid-right",
      "Bottom-left",
      "Bottom-center",
      "Bottom-right",
    ];

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mt-4">
            <div className="flex flex-wrap">
              <Controller
                name="companyLogoPosition"
                control={control}
                render={({ field }) => (
                  <Select
                    label={"Company Logo Position"}
                    field={field}
                    options={companyLogoPosition}
                  />
                )}
              />

              <Input
                label={"Cover Footer Text"}
                name={"coverFooterText"}
                register={register}
                required={true}
              />

              <div className="flex mx-4 py-4 items-center">
                <label className="mr-4 font-bold text-sm" htmlFor="">
                  Primary Color
                </label>
                <input
                  label={"Primary Theme Color"}
                  name={"primaryThemeColor"}
                  type={"color"}
                  defaultValue={"#B49373"}
                  {...register("primaryThemeColor", { required: true })}
                  className="w-10 h-10"
                />

                <label className="ml-12 mr-4 font-bold text-sm" htmlFor="">
                  Secondary Color
                </label>
                <input
                  label={"Secondary Theme Color"}
                  name={"secondaryThemeColor"}
                  type={"color"}
                  defaultValue={"#B49373"}
                  {...register("secondaryThemeColor", { required: true })}
                  className="w-10 h-10"
                />
              </div>

              <div className="bg-white w-full p-4 mx-4 my-5 shadow rounded-2xl flex flex-col">
                <p className="text-left my-2 text-slate-600 font-semibold">
                  Set Cover Image
                </p>
                <div className="flex space-x-5 text-slate-600 text-sm justify-start items-center">
                  <img
                    className="h-[100px] w-[100px] cursor-pointer rounded object-contain"
                    src={logo}
                    style={{ maxWidth: "100px",  maxHeight: "100px" }}
                    alt=""
                    onClick={handleClickImage}
                  />

                  <div className="">
                    <p>Choose image</p>
                    <p>JPG,GIF or PNG, Max size of 800kb</p>
                    <input
                      ref={fileInputRef}
                      className="mb-2 py-1 border-b-[2px] border-[#aaa]"
                      type="file"
                      name="logo"
                      placeholder="Company Logo"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>

              <div className="m-4">
                <label>
                  <input
                    type="checkbox"
                    checked={includeThankYou}
                    onChange={handleCheckboxChange}
                  />
                  <span>
                    {" "}
                    Include "Thank You for opportunity to conduct a home
                    inspection of the property listed above"{" "}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <SaveButton loading={loading} />
          </div>
        </form>
      </div>
    );
  };

  const selectedTabStyle = {
    color: "#fff",
    bg: "#FA6500",
    boxShadow: "2px 5px 8px #FA650090",
  };

  return (
    <>
      <div className="editForm mt-10 !px-4">
        <Tabs isLazy variant="soft-rounded" size="md">
          <TabList ml={"20px"}>
            <Tab className="mr-5" _selected={selectedTabStyle}>
              Company Info
            </Tab>
            <Tab className="mr-5" _selected={selectedTabStyle}>
              Inspector Info
            </Tab>
            <Tab className="mr-5" _selected={selectedTabStyle}>
              Pdf Settings
            </Tab>
            {/* <Tab className="mr-5" _selected={selectedTabStyle}>
              Additional Services
            </Tab>
            <Tab className="mr-5" _selected={selectedTabStyle}>
              Comments
            </Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <CompanyInfo />
            </TabPanel>

            <TabPanel>
              <InspectorInfo />
            </TabPanel>

            <TabPanel>
              <PdfSettings />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}

export default Administration;
