import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AiFillDashboard } from "react-icons/ai";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { MdContentPasteSearch } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { IoCreateOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Toolbar } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import HomeLayout from "../../layouts/HomeLayout";

const AdminDashboard = () => {
  const drawerWidth = 270;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  // Define sidebar items
  const sidebarItems = [
    {
      itemText: "All Orders",
      icon: <AiFillDashboard size={20} />,
      path: "all-orders",
    },
    {
      itemText: "Queries",
      icon: <TbDeviceDesktopAnalytics size={20} />,
      path: "queries",
    },
    {
      itemText: "Meals",
      icon: <MdContentPasteSearch size={20} />,
      path: "meals",
    },
    {
      itemText: "Offers",
      icon: <RxPerson size={20} />,
      path: "offers",
    },
    {
      itemText: "User Management",
      icon: <IoCreateOutline size={20} />,
      path: "users",
    },
    {
      itemText: "Reservation Management",
      icon: <IoCreateOutline size={20} />,
      path: "reservation",
    },
    // Uncomment this if needed
    // {
    //   itemText: "Setting",
    //   icon: <LuSettings size={20} />,
    //   path: "settings",
    // },
  ];

  // Filter sidebar items based on user type
  const filteredSidebarItems =
    user?.userType === "ADMIN"
      ? sidebarItems
      : sidebarItems.filter(
          (item) => item.path === "all-orders" || item.path === "queries"
        );

  useEffect(() => {
    const path = location.pathname.split("/").pop(); // Get the last part of the path
    const index = filteredSidebarItems.findIndex((item) => item.path === path);
    setSelectedIndex(index);
  }, [location.pathname, filteredSidebarItems]);

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(`/dashboard/${path}`);
  };

  const handleDrawerClose = () => {
    dispatch(setDrawerOpen(false));
  };

  return (
    <HomeLayout>
      <div id="dashboard" className="flex h-full">
        <div className="md:flex hidden">
          <Drawer
            onClose={handleDrawerClose}
            open={drawerOpen}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              overflow: "hidden",
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                position: "relative",
                boxSizing: "border-box",
                zIndex: "1",
                backgroundColor: "white",
              },
              "& .MuiListItemButton-root": {
                justifyContent: "center",
              },
            }}
            variant="permanent"
            anchor="left"
            className="hidden md:block"
          >
            <List className="overflow-hidden">
              {filteredSidebarItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    disableRipple
                    selected={selectedIndex === index}
                    onClick={() => handleListItemClick(index, item.path)}
                    className={`${
                      selectedIndex === index
                        ? `dark:bg-white dark:text-zinc-900 bg-gray-800 text-white`
                        : "dark:text-white text-gray-900-700"
                    } font-Poppins rounded-full px-1.5`}
                  >
                    <ListItemIcon
                      className={`${
                        selectedIndex === index
                          ? "dark:bg-white dark:text-zinc-900 bg-inherit text-white"
                          : "dark:text-white text-gray-900-700"
                      } mx-8`}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      className="font-Poppins -mx-12"
                      primary={item.itemText}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider className="dark:bg-gray-600" />
          </Drawer>

          <div>
            <Divider />
            <Drawer
              onClose={handleDrawerClose}
              open={drawerOpen}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                backgroundColor: "white",
                overflow: "hidden",
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  position: "relative",
                  boxSizing: "border-box",
                  zIndex: 1,
                },
                "& .MuiListItemButton-root": {
                  justifyContent: "center",
                },
              }}
              variant="temporary"
              anchor="left"
            >
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                ></div>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleDrawerClose}
                >
                  <IoMdClose />
                </IconButton>
              </Toolbar>
              <List sx={{ overflow: "hidden" }}>
                {filteredSidebarItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemButton
                      disableRipple
                      selected={selectedIndex === index}
                      className={`${
                        selectedIndex === index
                          ? "bg-gray-800 text-white"
                          : "text-gray-900-700"
                      } font-Poppins rounded-full px-1.5`}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#282C35",
                          borderRadius: "50px",
                          "&:hover": {
                            backgroundColor: "#282C35",
                          },
                          color: "white",
                          "& .MuiListItemIcon-root": {
                            color: "white",
                          },
                        },
                      }}
                      onClick={() => handleListItemClick(index, item.path)}
                    >
                      <ListItemIcon
                        className={`${
                          selectedIndex === index
                            ? "bg-inherit text-white"
                            : "text-gray-900-700"
                        } mx-8`}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        className="font-Poppins -mx-12"
                        primary={item.itemText}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Drawer>
          </div>
        </div>
        <div className="w-full px-6 py-4 h-svh overflow-auto">
          <Outlet />
        </div>
      </div>
    </HomeLayout>
  );
};

export default AdminDashboard;
