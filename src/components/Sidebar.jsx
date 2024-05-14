import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
//import { MdAdminPanelSettings, MdHelp } from "react-icons/md";
//import { IoMdDocument, IoMdSettings } from "react-icons/io";
//import { BsFillCalendar2EventFill } from "react-icons/bs";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { RiCalendarEventLine } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";

function Sidebar() {
  return (
    <>
      <ul className="flex flex-col gap-2">
        <li className="flex justify-center">
          <img className="h-[150px]" src={logo} alt="" />
        </li>

        <li className="flex justify-end">
          <NavLink
            className="w-[90%] flex items-center text-center rounded-l-full py-3"
            to={"./"}
          >
            <span className="active-icons"></span>
            <div className="icon flex justify-end w-[60px] mr-4">
              <FaBarsStaggered
                size={22}
                color="#FA6500"
                style={styles.iconSetting}
                className="p-[4px] rounded-full bg-[white] cursor-pointer"
              />
            </div>
            <p className="text-xs font-[500]">Dashboard</p>
          </NavLink>
        </li>

        <li className="flex justify-end">
          <NavLink
            className="w-[90%] flex items-center text-center rounded-l-full py-3"
            to={"/dashboard/reports"}
          >
            <span className="active-icons"></span>
            <div className="icon flex justify-end w-[60px] mr-4">
              <MdOutlineInsertDriveFile
                size={22}
                color="#FA6500"
                style={styles.iconSetting}
                className="p-[3px] rounded-full bg-[white] cursor-pointer"
              />
            </div>
            <p className="text-xs font-[500]">New Report</p>
          </NavLink>
        </li>

        <li className="flex justify-end">
          <NavLink
            className="w-[90%] flex items-center text-center rounded-l-full py-3"
            to={"/dashboard/administration"}
          >
            <span className="active-icons"></span>
            <div className="icon flex justify-end w-[60px] mr-4">
              <MdOutlineAdminPanelSettings 
                size={22}
                color="#FA6500"
                style={styles.iconSetting}
                className="p-[2px] rounded-full bg-[white] cursor-pointer"
              />
            </div>
            <p className="text-xs font-[500]">Administration</p>
          </NavLink>
        </li>

        <li className="flex justify-end">
          <NavLink
            className="w-[90%] flex items-center text-center rounded-l-full py-3"
            to={"/dashboard/schedules"}
          >
            <span className="active-icons"></span>
            <div className="icon flex justify-end w-[60px] mr-4">
              <RiCalendarEventLine
                size={22}
                color="#FA6500"
                style={styles.iconSetting}
                className="p-[3px] rounded-full bg-[white] cursor-pointer"
              />
            </div>
            <p className="text-xs font-[500]">Schedules</p>
          </NavLink>
        </li>

        <li className="flex justify-end">
          <NavLink
            className="w-[90%] flex items-center text-center rounded-l-full py-3"
            to={"/dashboard/help"}
          >
            <span className="active-icons"></span>
            <div className="icon flex justify-end w-[60px] mr-4">
              <MdHelpOutline
                size={22}
                color="#FA6500"
                style={styles.iconSetting}
                className="p-[2px] rounded-full bg-[white] cursor-pointer"
              />
            </div>
            <p className="text-xs font-[500]">Help</p>
          </NavLink>
        </li>

        <li className="flex justify-end">
          <NavLink
            className="w-[90%] flex items-center text-center rounded-l-full py-3"
            to={"/dashboard/settings"}
          >
            <span className="active-icons"></span>
            <div className="icon flex justify-end w-[60px] mr-4">
              <IoSettingsOutline 
                size={22}
                color="#FA6500"
                style={styles.iconSetting}
                className="p-[2px] rounded-full bg-[white] cursor-pointer"
              />
            </div>
            <p className="text-xs font-[500]">Settings</p>
          </NavLink>
        </li>
      </ul>
    </>
  );
}

const styles = {
  iconSetting: {
    boxShadow:
      "0 4px 6px -1px rgba(255, 99, 71, .5), 0 2px 4px -1px rgba(255, 99, 71, 1)",
  },
};

export default Sidebar;
