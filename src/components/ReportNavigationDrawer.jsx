import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  Text,
  AccordionPanel,
  Button
} from "@chakra-ui/react";

import { RiDeleteBinLine } from "react-icons/ri";

import { deletePropertyReq } from "../services/api";
import Swal from "sweetalert2";
import nestedLinksfun from "./NestedLinks";

function ReportNavigationDrawer({
  ground,
  roof,
  exterior,
  garage,
  basement,
  bathroom,
  crawlSpace,
  diningRoom,
  electricCoolingSystem,
  heatingSystem,
  interior,
  kitchen,
  laundryRoom,
  livingRoom,
  plumbing,
  bedroom,
  toggleRefresh,
  isDrawerOpen,
}) {
  const location = useLocation();
  const { id } = useParams();

  const variants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  const deleteProperty = async (property, propertyId) => {
    if (location.pathname.includes(propertyId)) {
      Swal.fire({
        icon: "error",
        title: "Oops Please close the tab before deleting",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    await deletePropertyReq(id, property, propertyId).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "info",
          title: res.msg,
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        toggleRefresh();
      }
    });
  };

  const navLink = [
    {
      name: "General",
      link: "./",
    },
    {
      name: "Property",
      link: "property",
    },
    {
      name: "Related Contacts",
      link: "contacts",
    },
    {
      name: "Invoice",
      link: "invoice",
    },
    {
      name: "Summary",
      link: "summary",
    },
    {
      name: "Overview",
      link: "overview",
    },
  ];

  useEffect(() => {
    console.log(bedroom)
  }, [])


  const nestedLinks = nestedLinksfun(
    ground,
    roof,
    exterior,
    garage,
    basement,
    bathroom,
    crawlSpace,
    diningRoom,
    electricCoolingSystem,
    heatingSystem,
    interior,
    kitchen,
    laundryRoom,
    livingRoom,
    plumbing,
    bedroom
  );

  return (
    <>
      <motion.div
        className="reportNavbarDrawer editForm !p-0 rounded-lg bg-white "
        initial={{ width: "300px" }}
        style={{
          maxHeight: "640px",
          width: "300px",
          overflow: "hidden",
          overflowY: "scroll",
          scrollbar: "0px",
        }}
        animate={{ width: isDrawerOpen ? "300px" : "0px" }}
        exit={{ width: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Box className="px-6 py-2 font-semibold bg-gray-700 text-white mb-2">
          <Text className="drawer-text-nowrap">Menu</Text>
        </Box>
        <Box>
          <Box as="span" flex="1" textAlign="left" px={2} style={{ padding: 0 }}>
            <ul className="reportNavbar flex flex-col gap-2">
              {navLink.map((item, idx) => (
                <NavLink
                  key={idx}
                  className="drawer-text-nowrap px-6 py-2 hover:bg-slate-300"
                  to={item.link}
                >
                  {item.name}
                </NavLink>
              ))}
              {nestedLinks.map((elem, index) => (
                <Accordion key={elem.name + index} allowMultiple>
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        className={`${location.pathname.includes(elem.propertyId)
                          ? "active accBtn"
                          : "accBtn"
                          } hover:text-slate-900 hover:!bg-slate-300`}
                      >
                        <Box as="span" flex="1" textAlign="left" px={2}>
                          {elem.name}
                        </Box>
                        <RiDeleteBinLine
                          onClick={() => {
                            deleteProperty(elem.mainRoute, elem.propertyId);
                          }}
                          className="mx-5"
                        />
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel className="accPanel" px={0} p={0}>
                      {elem.childRoute.map((route, idx) => (
                        <ul
                          className="flex flex-col gap-2"
                          key={route.name + idx}
                        >
                          <NavLink
                            to={route.link}
                            className="px-10 text-sm py-2 hover:bg-slate-300"
                          >
                            {route.name}
                          </NavLink>
                        </ul>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
              <Box onClick={() => {
                  window.open(`/output/${id}`, '_blank');
              }} className="drawer-text-nowrap cursor-pointer mb-12 px-6 py-2 hover:bg-slate-300">
                Report
              </Box>
            </ul>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}

export default ReportNavigationDrawer;
