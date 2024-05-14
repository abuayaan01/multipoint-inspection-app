import React, { useState, useEffect } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getInspectionByUserIdReq, deleteInspectionReq } from "../services/api";
import { Skeleton } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";

function RecentInspection({ no, label, home , refreshRecentInspection }) {
  const [inspectionData, setInspectionData] = useState({});
  const [property, setProperty] = useState({});
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const deleteInspection = async (inspectionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteInspectionReq(inspectionId)
          .then((res) => {
            if (res.status === 204) {
              getInspectionByUserIdReq(localStorage.getItem("userId")).then(
                (res) => {
                  setInspectionData(res);
                }
              );
            }
          })
          .catch((e) => console.log(e));
        Swal.fire("Deleted!", "The item has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    setLoader(true);
    getInspectionByUserIdReq(localStorage.getItem("userId"))
      .then((res) => {
        setInspectionData(res);
        setLoader(false);
      })
      .catch((e) => console.log(e));
  }, [refreshRecentInspection]);

  useEffect(() => {
    const numberOfKeys = Object.keys(inspectionData).length;

    if (typeof no !== "undefined") {
      no(numberOfKeys);
    }
  }, [inspectionData]);

  // function getRandomColor() {
  //   let color = "hsl(" + Math.random() * 360 + ", 100%, 95%)";
  //   return color;
  // }

  return (
    <>
      <p className="text-slate-600">{label}</p>

      {Object.keys(inspectionData).length > 0 ? (
        <div className="py-2">
          {(home
            ? Object.values(inspectionData)?.slice(0, 3)
            : Object.values(inspectionData)
          )?.map((elem, index) => {
            return (
              <div
                key={index}
                style={{
                  // background : getRandomColor(),
                }}
                className="flex bg-slate-200 items-center rounded my-5"
              >
                <div className="reportImage">
                  <img
                    className="w-[70px] h-[60px] rounded bg-slate-300"
                    src={logo}
                    alt=""
                  />
                </div>
                <div className="px-5 flex-1 reportText flex flex-col justify-start">
                  <p className="text-[14px] text-slate-600">{elem?.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {elem?.address?.street +
                      ", " +
                      elem?.address?.city
                      // + ", " +
                      // elem.address.state +
                      // ", " +
                      // elem.address.zipCode
                    }
                  </p>
                </div>
                <div className="reportEdit px-5 flex gap-5">
                  <button
                    className="text-red-500 flex items-center gap-2 px-3 rounded bg-white"
                    onClick={() => deleteInspection(elem._id)}
                  >
                    <MdDelete /> Delete
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 rounded border-[1px]! bg-white"
                    onClick={() => {
                      if (home) {
                        navigate(`report/${elem._id}/`);
                      } else {
                        navigate(`../report/${elem._id}`);
                      }
                    }}
                  >
                    <MdModeEditOutline /> Edit
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 rounded border-[1px]! bg-white"
                    onClick={() => {
                      window.open(`/output/${elem._id}`, '_blank');
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {loader ? (
            <>
              <Skeleton my={"4"} height={"60px"} />
            </>
          ) : (
            <>
              <div className="flex flex-1 h-full justify-center items-center">
                <p className="text-xs text-slate-500 py-5">No record found</p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default RecentInspection;
