import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile, base_url } from "../services/api";
import {
  Text,
  Box,
  Menu,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { SlSettings } from "react-icons/sl";
import { useComponent } from "../Context/ComponentContext";

function Navbar() {
  const { updatedProfileImage, setUpdatedProfileImage } = useComponent();
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    getUserProfile(id).then((res) => {
      setUser(res);
    });
  }, [updatedProfileImage]);

  // useEffect(() => {
  //   setUpdatedProfileImage(user?.profileImage)
  // },[user, updatedProfileImage])

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  let pageName = "Multipoint";

  const pageNameMappings = {
    "/dashboard/": "Dashboards",
    "/dashboard/reports": "Reports",
    "/dashboard/report/*": "Report",
    "/dashboard/administration": "Administration",
    "/dashboard/help": "Help",
    "/dashboard/settings": "Settings",
  };

  if (pageNameMappings[pathname]) {
    pageName = pageNameMappings[pathname];
  }

  if (pathname.startsWith("/dashboard/report/")) {
    pageName = "Report";
  }

  const styles = {
    iconSetting: {
      boxShadow:
        "0 4px 6px -1px rgba(255, 99, 71, .5), 0 2px 4px -1px rgba(255, 99, 71, 1)",
    },
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          <div className="page-title text-slate-600 font-semibold">
            {pageName}
          </div>
          {(pageName == "Reports" || pageName == "Help") && (
            <div className="hidden md:block">
              <input
                className="bg-slate-200 focus:outline-none py-2 px-10 rounded-full"
                placeholder="Search"
                size="sm"
              />
            </div>
          )}
          <div className="flex items-center">
            <div className="menu mr-4 z-10">
              <Menu>
                <MenuButton
                  className="!bg-transparent"
                  as={IconButton}
                  aria-label="Options"
                  icon={
                    <SlSettings
                      size={30}
                      color="#FA6500"
                      style={styles.iconSetting}
                      className="p-[5px] rounded-full bg-[white] cursor-pointer"
                    />
                  }
                />

                <MenuList>
                  <Box
                    py={"2"}
                    px={"3"}
                    alignContent={"center"}
                    justifyContent={"center"}
                  >
                    <Text fontSize={"xs"}>Signed in as</Text>
                    <Text fontWeight={"600"}>
                      {user?.firstName + " " + user?.lastName}
                    </Text>
                  </Box>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem
                      fontSize={"sm"}
                      onClick={() => navigate("./settings")}
                    >
                      Your Profile
                    </MenuItem>
                    <MenuItem
                      fontSize={"sm"}
                      onClick={() => navigate("./help")}
                    >
                      Help
                    </MenuItem>
                    <MenuItem
                      fontSize={"sm"}
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                </MenuList>
              </Menu>
            </div>

            <Avatar
              name={user?.firstName + " " + user?.lastName}
              src={
                user?.profileImage &&
                `${base_url}/uploads/${user?.profileImage}`
              }
            />
            <div className="flex flex-col">
              <span className="px-2 text-orange-500 font-semibold">
                {user?.firstName}
              </span>
              <span className="px-2 text-slate-500">Inspector</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
