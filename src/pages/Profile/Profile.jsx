import React, { useEffect, useState , useRef } from "react";
import { Grid, GridItem, Avatar, Skeleton, SkeletonText, SkeletonCircle , Spinner } from "@chakra-ui/react";
import { MdLocationPin, MdEmail } from "react-icons/md";
import { BsFillBuildingFill } from "react-icons/bs";
import imageLogo from "../../assets/imageUpload.png";
import { useForm } from "react-hook-form";
import { updateProfileReq, getUserProfile, base_url } from "../../services/api";
import Swal from "sweetalert2";
import { useComponent } from "../../Context/ComponentContext";
import Compressor from "compressorjs";

function Profile() {
  const [maxDate, setMaxDate] = useState(getFormattedCurrentDate());
  const { register, handleSubmit, setValue } = useForm();
  const [profileImage, setProfileImage] = useState();
  const [profile, setProfile] = useState(null)
  const [profileData, setProfileData] = useState()
  const fileInputRef = useRef(null);
  const [loaded,setLoaded] = useState(true);
  const [btnLoader,setBtnLoader] = useState(false);
  const {updatedProfileImage, setUpdatedProfileImage}= useComponent()

  useEffect(()=>{
    getProfileDetails();
  },[])

  const getProfileDetails = async () => {
    setLoaded(false)
    const res = await getUserProfile(localStorage.getItem('userId'))
    setProfileData(res)
    setLoaded(true);

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
        setProfileImage(URL.createObjectURL(compressedFile));
        setProfile({ profileImage: compressedFile });
      } catch (error) {
        console.error("Compression Error:", error);
      }
    }
  };

  const updateProfile = async (profileData) => {
    setBtnLoader(true);
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    for (const key in profileData) {
      if (profileData.hasOwnProperty(key)) {
        formData.append(key, profileData[key]);
      }
    }

    const res = await updateProfileReq(userId, formData);
    setBtnLoader(false);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Saved",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      setProfileData(res.details);
      setUpdatedProfileImage(res.details.profileImage)
      setProfileImage(null);
    }
  };

  useEffect(() => {
    for (const key in profileData) {
      if (profileData.hasOwnProperty(key)) {
        setValue(key, profileData[key]);
      }
    }
  }, [setValue, profileData]);

  function getFormattedCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear() - 18;
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const onSubmit = async (data) => {
    for (const key in profile) {
      if(profile.hasOwnProperty(key)){
        data[key] = profile[key];
      }
    }
    const profileData ={...profile, ...data}
    updateProfile(profileData);
  };

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Grid
        mt={5}
        templateAreas={`"Edit View"
                        "Edit View"
                        "Edit View"`}
        gridTemplateColumns={"1fr 340px"}
        gap={4}
      >
        <GridItem area={"Edit"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="editProfile rounded-3xl shadow-xl bg-[white]">
                <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                  <div className="flex items-center">
                    <p className="mb-0 darktext-white/80">Edit Profile</p>
                    <button
                      type="submit"
                      className="w-[100px] inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-orange-400 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                    >
                      {btnLoader ? <Spinner size={"sm"} /> : "Save"}
                    </button>
                  </div>
                </div>
                <div className="flex-auto p-6">
                  <p className="leading-normal uppercase darktext-white darkopacity-60 text-sm">
                    User Information
                  </p>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="first name"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name={"firstName"}
                          {...register("firstName")}
                          required={true}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="last name"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          {...register("lastName")}
                          required={true}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="phone"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          {...register("phoneNumber")}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          Email address
                        </label>
                        <input
                        disabled
                          type="email"
                          name="email"
                          {...register("email")}
                          required={true}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="last name"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          Date of birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          {...register("dob")}
                          max={maxDate}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="last name"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          Company name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          {...register("companyName")}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent darkbg-gradient-to-r darkfrom-transparent darkvia-white darkto-transparent " />
                  <p className="leading-normal uppercase darktext-white darkopacity-60 text-sm">
                    Contact Information
                  </p>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          {...register("address")}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="city"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          {...register("city")}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="country"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          {...register("country")}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="Zip / Postal Code"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          Zip / Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          {...register("postalCode")}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent darkbg-gradient-to-r darkfrom-transparent darkvia-white darkto-transparent " />
                  <p className="leading-normal uppercase darktext-white darkopacity-60 text-sm">
                    About me
                  </p>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                      <div className="mb-4">
                        <label
                          htmlFor="about me"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                        >
                          About me
                        </label>
                        <input
                          type="text"
                          name="aboutMe"
                          {...register("aboutMe")}
                          className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </GridItem>
        <GridItem area={"View"}>
          <div className="w-full max-w-full mt-6 shrink-0 md:flex-0 md:mt-0">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl darkbg-slate-850 darkshadow-darkxl rounded-2xl bg-clip-border">
              <Skeleton roundedTop={'2xl'} isLoaded={loaded}>
              <img
                className="w-full h-[150px] rounded-t-2xl"
                src="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile cover image"
              />
              </Skeleton>
              <div className="flex flex-wrap justify-center -mx-3">
                <div className="w-4/12 max-w-full px-3 flex-0 ">
                  <div className="mb-6 -mt-6 lg:mb-0 lg:-mt-16">
                  <SkeletonCircle isLoaded={loaded} size={''} >
                    <Avatar name={profileData?.firstName + " " + profileData?.lastName} src={profileData?.profileImage && `${base_url}/uploads/${profileData?.profileImage}`} size={"xl"} />
                  </ SkeletonCircle>
                  </div>
                </div>
              </div>
              <div className="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4"></div>
              <div className="flex-auto p-6 pt-0">
                <div className="mt-6 text-center">
                  <h5 className="darktext-white text-2xl pb-5 text-slate-700">
                  <Skeleton noOfLines={1} isLoaded={loaded} size={''}>
                  { profileData?.firstName + " " + profileData?.lastName}
                    <span className="font-light">{profileData?.age ? ", " + profileData?.age : null }</span>
                  </Skeleton>
                  </h5>
                  <SkeletonText isLoaded={loaded} my={'2'} noOfLines={1} size={''}>
                  <span className="darktext-white flex items-center justify-center text-slate-600">
                    <MdEmail className="mx-2" /> {profileData?.email}
                  </span>
                  </SkeletonText>
                  <div className="mb-2 leading-relaxed text-base darktext-white/80 text-slate-600">
                      <SkeletonText isLoaded={loaded} size={''} noOfLines={1}>
                    <span className="flex items-center justify-center gap-2">
                        <MdLocationPin />
                      {profileData?.city && profileData?.country ? (profileData?.city +" , " + profileData?.country) : ("Add Address")}
                    </span>
                      </ SkeletonText>
                  </div>
                  <div className="mt-6 mb-2 leading-relaxed text-base darktext-white/80 text-slate-600">
                    <SkeletonText isLoaded={loaded} noOfLines={1}>
                    <span className="flex items-center justify-center gap-2">
                      <BsFillBuildingFill />
                      {profileData?.companyName ? profileData?.companyName : "Add Company" }
                    </span>
                    </SkeletonText>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 my-5 shadow-xl rounded-2xl flex flex-col">
              <p className="text-left my-2 text-slate-600 font-semibold">
                Select profile photo
              </p>
              <div className="flex space-x-5 text-slate-600 text-sm justify-center items-center">
                <img
                  className="h-[100px] w-[100px] cursor-pointer rounded object-cover"
                  src={profileImage ? profileImage : imageLogo}
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
                  name="profileImage"
                  placeholder="Profile Image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                </div>
              </div>
            </div>
          </div>
        </GridItem>
      </Grid>
    </>
  );
}

export default Profile;
