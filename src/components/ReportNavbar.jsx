import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import PDFConverter from "./PDFConverter";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlinePlaylistAdd, MdAdd } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { motion } from "framer-motion";
import { useComponent } from "../Context/ComponentContext";
import { createPropertyReq } from "../services/api";
import Swal from "sweetalert2";

function ReportNavbar({ toggleRefresh, isDrawerOpen, setIsDrawerOpen }) {
  const { currentComponentName } = useComponent();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  const createProperty = async (property) => {
    setLoader(true);
    await createPropertyReq(id, property)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: res.msg,
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          });
          toggleRefresh();
        }
      })
      .catch((err) => console.log(err));
    setLoader(false);
  };

  const buttonVariants = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-[white] cursor-pointer rounded-full p-3 shadow-md flex items-center mt-10 mb-5">
        <div className="flex">
          <Menu>
            <MenuButton
              className="!bg-gray-700 !bg-orange-500! !min-w-[30px] !h-[30px] !rounded-full"
              as={IconButton}
              aria-label="Options"
              icon={
                !loader ? (
                  <MdOutlinePlaylistAdd size={20} color="white" />
                ) : (
                  <Spinner size={"xs"} color="white" />
                )
              }
            />
            <MenuList>
              <MenuItem
                onClick={() => createProperty("grounds")}
                icon={<MdAdd />}
              >
                Add Ground
              </MenuItem>
              <MenuItem icon={<MdAdd />} onClick={() => createProperty("roof")}>
                Add Roof
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("exterior")}
              >
                Add Exterior
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("garage")}
              >
                Add Garage
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("bathroom")}
              >
                Add Bathroom
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("crawlSpace")}
              >
                Add Crawlspace
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("basement")}
              >
                Add Basement
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("kitchen")}
              >
                Add Kitchen
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("diningRoom")}
              >
                Add Dining Room
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("livingRoom")}
              >
                Add Living Room
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("heatingSystem")}
              >
                Add Heating System
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("plumbing")}
              >
                Add Plumbing
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("bedroom")}
              >
                Add Bedroom
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("electricCoolingSystem")}
              >
                Add Electric Cooling System
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("interior")}
              >
                Add Interior
              </MenuItem>
              <MenuItem
                icon={<MdAdd />}
                onClick={() => createProperty("laundryRoom")}
              >
                Add Laundry Room
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <p className="text-slate-600 text-sm mx-3 flex-1">
          {currentComponentName}
        </p>
        <span className="px-3">
          {/* <PDFConverter /> */}
        </span>
      </div>

      <div
        className="mt-10 mb-5 p-4 rounded-full shadow-md bg-white cursor-pointer"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <span className="">
          <HiDotsVertical
            size={20}
            color={isDrawerOpen ? "rgb(249 115 22)" : ""}
          />
        </span>
      </div>
      {/* <motion.button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            initial={false}
            animate={isDrawerOpen ? "open" : "closed"}
            variants={buttonVariants}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {isDrawerOpen ? (
              <>
                <CiMenuFries size={20} className="text-slate-600" />
              </>
            ) : (
              <>
                <CiMenuFries size={20} className="text-slate-600" />
              </>
            )}
          </motion.button> */}
    </div>
  );
}

export default ReportNavbar;
