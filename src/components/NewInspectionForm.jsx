import React, { useEffect, useState } from "react";
import { db } from "../services/db";
import { useNavigate } from "react-router-dom";
import { CreateNewInspection } from "../services/api";
import Swal from "sweetalert2";
import { Spinner } from "@chakra-ui/react";
import { CgSelect } from "react-icons/cg";

function NewInspectionForm({ HideForm }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [propertyInformation, setPropertyInformation] = useState({
    bathrooms: "0",
    additionalRooms: "0",
    basement: "Full",
    crawlSpace: "Full",
    garageType: "Attached",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handlePropertyInfoChange = (e) => {
    const { name, value } = e.target;
    setPropertyInformation({
      ...propertyInformation,
      [name]: value,
    });
  };

  const createEntry = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      !name ||
      !number ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode
    ) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Required fields missing",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    setLoading(true);

    const data = {
      userId: userId,
      general: {
        name: name,
        number: number,
        address: address,
        ...propertyInformation,
      },
    };

    await CreateNewInspection(data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.msg,
          position: "top",
          timer: 2000,
        });
        navigate("/");
      })
      .catch((e) => console.log(e));
    setLoading(false);
  };

  return (
    <>
      <div>
        <form className="editForm">
          <span className="tabHeading flex justify-center" htmlFor="">
            New Inspection Form
          </span>
          <div className="w-full max-w-full mb-4 px-3 shrink-0 md:w-12/12 md:flex-0">
            <label
              htmlFor="Name"
              className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
            >
              Name{" "}
            </label>
            <input
              className={`focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none ${
                submitted && !name && "border-red-500"
              }`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="w-full max-w-full mb-4 px-3 shrink-0 md:w-12/12 md:flex-0">
            <label
              htmlFor="Number"
              className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
            >
              Number
            </label>
            <br />
            <input
              className={`focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none ${
                submitted && !number && "border-red-500"
              }`}
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className="w-full max-w-full mb-4 px-3 shrink-0 md:w-12/12 md:flex-0">
            <label
              htmlFor="Address"
              className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80 "
            >
              Address
            </label>{" "}
            <br />
            <div className="flex flex-wrap gap-5">
              <input
                className={`w-1/2 pr-4 gap-2 my-2 mb-2 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none ${
                  submitted && !address.street && "border-red-500"
                }`}
                type="text"
                placeholder="Street"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
              />
              <input
                className={`w-1/2 pr-4 flex-1 gap-2 my-2 mb-2 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none ${
                  submitted && !address.city && "border-red-500"
                }`}
                type="text"
                placeholder="City"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
              />
              <input
                className={`w-1/2 pr-4 gap-2 my-2 mb-2 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none ${
                  submitted && !address.state && "border-red-500"
                }`}
                type="text"
                placeholder="State"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
              />
              <input
                className={`w-1/2 pr-4 flex-1 gap-2 my-2 mb-2 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none ${
                  submitted && !address.zipCode && "border-red-500"
                }`}
                type="text"
                placeholder="Zip / Postal Code"
                name="zipCode"
                value={address.zipCode}
                onChange={handleAddressChange}
              />
            </div>{" "}
          </div>

          <div className="mx-3">
            <p className="text-slate-600 py-5 leading-normal uppercase darktext-white darkopacity-60 text-sm">
              Property Information
            </p>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-4 flex flex-col gap-2 my-2 rounded">
                <label
                  htmlFor="Bathroom"
                  className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                >
                  Bathroom(s){" "}
                </label>
                <div className="relative">
                  <select
                    className="flex-1 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
                    name="bathrooms"
                    id="bathrooms"
                    value={propertyInformation.bathrooms}
                    onChange={handlePropertyInfoChange}
                  >
                    <option className="bg-slate-900 text-[white]" value="0">
                      0
                    </option>
                    <option className="bg-slate-900 text-[white]" value="1">
                      1
                    </option>
                    <option className="bg-slate-900 text-[white]" value="2">
                      2
                    </option>
                    <option className="bg-slate-900 text-[white]" value="3">
                      3
                    </option>
                    <option className="bg-slate-900 text-[white]" value="4">
                      4
                    </option>
                    <option className="bg-slate-900 text-[white]" value="5">
                      5
                    </option>
                    <option className="bg-slate-900 text-[white]" value="6">
                      6
                    </option>
                    <option className="bg-slate-900 text-[white]" value="7">
                      7
                    </option>
                    <option className="bg-slate-900 text-[white]" value="8">
                      8
                    </option>
                  </select>
                  <div className="absolute right-3 top-3">
                    <CgSelect />
                  </div>
                </div>
              </div>

              <div className="w-1/2 pr-4 flex flex-col gap-2 my-2 rounded">
                <label
                  htmlFor="additionalRoom"
                  className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                >
                  Add'l Room(s){" "}
                </label>
                <div className="relative">
                  <select
                    className="flex-1 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
                    name="additionalRooms"
                    id="additionalRooms"
                    value={propertyInformation.additionalRooms}
                    onChange={handlePropertyInfoChange}
                  >
                    <option className="bg-slate-900 text-[white]" value="0">
                      0
                    </option>
                    <option className="bg-slate-900 text-[white]" value="1">
                      1
                    </option>
                    <option className="bg-slate-900 text-[white]" value="2">
                      2
                    </option>
                    <option className="bg-slate-900 text-[white]" value="3">
                      3
                    </option>
                    <option className="bg-slate-900 text-[white]" value="4">
                      4
                    </option>
                    <option className="bg-slate-900 text-[white]" value="5">
                      5
                    </option>
                    <option className="bg-slate-900 text-[white]" value="6">
                      6
                    </option>
                    <option className="bg-slate-900 text-[white]" value="7">
                      7
                    </option>
                    <option className="bg-slate-900 text-[white]" value="8">
                      8
                    </option>
                  </select>
                  <div className="absolute right-3 top-3">
                    <CgSelect />
                  </div>
                </div>
              </div>

              <div className="w-1/2 pr-4 flex flex-col gap-2 my-2 rounded">
                <label
                  htmlFor="Basement"
                  className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                >
                  Basement{" "}
                </label>
                <div className="relative">
                  <select
                    className="flex-1 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
                    name="basement"
                    id="basement"
                    value={propertyInformation.basement}
                    onChange={handlePropertyInfoChange}
                  >
                    <option className="bg-slate-900 text-[white]" value="Full">
                      Full
                    </option>
                    <option
                      className="bg-slate-900 text-[white]"
                      value="Partial"
                    >
                      Partial
                    </option>
                    <option className="bg-slate-900 text-[white]" value="NA">
                      None
                    </option>
                  </select>
                  <div className="absolute right-3 top-3">
                    <CgSelect />
                  </div>
                </div>
              </div>

              <div className="w-1/2 pr-4 flex flex-col gap-2 my-2 rounded">
                <label
                  htmlFor="crawlSpace"
                  className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                >
                  Crawl Space{" "}
                </label>
                <div className="relative">
                  <select
                    className="flex-1 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
                    name="crawlSpace"
                    id="crawlSpace"
                    value={propertyInformation.crawlSpace}
                    onChange={handlePropertyInfoChange}
                  >
                    <option className="bg-slate-900 text-[white]" value="Full">
                      Full
                    </option>
                    <option
                      className="bg-slate-900 text-[white]"
                      value="Partial"
                    >
                      Partial
                    </option>
                    <option className="bg-slate-900 text-[white]" value="NA">
                      None
                    </option>
                  </select>
                  <div className="absolute right-3 top-3">
                    <CgSelect />
                  </div>
                </div>
              </div>

              <div className="w-1/2 pr-4 flex flex-col gap-2 my-2 rounded">
                <label
                  htmlFor="garageType"
                  className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                >
                  Garage Type{" "}
                </label>
                <div className="relative">
                  <select
                    className="flex-1 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
                    name="garageType"
                    id="garageType"
                    value={propertyInformation.garageType}
                    onChange={handlePropertyInfoChange}
                  >
                    <option
                      className="bg-slate-900 text-[white]"
                      value="Attached"
                    >
                      Attached
                    </option>
                    <option
                      className="bg-slate-900 text-[white]"
                      value="Detached"
                    >
                      Detached
                    </option>
                    <option
                      className="bg-slate-900 text-[white]"
                      value="Carport"
                    >
                      Carport
                    </option>
                    <option className="bg-slate-900 text-[white]" value="NA">
                      None
                    </option>
                  </select>
                  <div className="absolute right-3 top-3">
                    <CgSelect />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-5 mx-3">
            <button
              type="button"
              onClick={HideForm}
              className="bg-red-400 text-slate-100 px-5 py-1 rounded mr-5 w-[120px]"
            >
              Cancel
            </button>
            <button
              onClick={createEntry}
              type="submit"
              className="bg-green-400 text-white px-5 py-1 rounded w-[120px]"
            >
              {loading ? <Spinner size={"sm"} /> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewInspectionForm;
