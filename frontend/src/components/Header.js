import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTools,
  FaInfoCircle,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, signOut } from "../store/userSlice";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
// Import the UserAvatar component

const UserAvatar = ({ user }) => {
  if (!user) return null; // If no user is available, don't render anything

  // Split the user's name into parts
  const nameParts = user.userName.trim().split(" ");

  // Get initials or single letter
  const initials =
    nameParts.length > 1 ? nameParts[0][0] + nameParts[1][0] : nameParts[0][0];

  return (
    <div className="flex items-center">
      <div className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-full">
        {initials.toUpperCase()}
        {}
      </div>
    </div>
  );
};

const Header = () => {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Define the nav items
  const navItems = [
    { name: "Home", link: "#hero", icon: <FaHome /> },
    { name: "Service", link: "#service", icon: <FaTools /> },
    { name: "Offers", link: "#offers", icon: <MdLocalOffer /> },
    { name: "Gallery", link: "#gallery", icon: <IoMdPhotos /> },
    { name: "About Us", link: "#about", icon: <FaInfoCircle /> },
  ];

  const handleSignOut = () => {
    dispatch(setIsLoading(true));
    dispatch(signOut());
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 2000);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu on avatar click
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  // Handle scroll event
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100; // Adjust offset if needed

    navItems.forEach((item) => {
      const section = document.querySelector(item.link);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(item.link);
        }
      }
    });
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle nav item click
  const handleNavClick = (link) => {
    navigate("/");
    setActiveSection(link);
    document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center bg-opacity-50 backdrop-blur-md justify-between px-16 py-2 bg-gray-800 text-white">
      {/* Logo */}
      <div className="flex items-center cursor-pointer font-extrabold">
        <div onClick={() => navigate("/")}>ABC Restaurant</div>
      </div>

      {/* Navigation Center */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.link);
              }}
              className={`flex cursor-pointer items-center gap-2 px-2 ${
                activeSection === item.link ? "text-yellow-400" : "text-white"
              } hover:text-gray-400`}
            >
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </a>
          ))}
        </div>
      </div>

      {/* User Controls */}
      <div className="ml-auto flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {/* Attach onClick to open menu */}
              <div onClick={handleMenuOpen}>
                <UserAvatar user={user} />
              </div>
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleMenuClose} // Close the menu when clicking outside or on menu item
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/profile">
                  <ListItemIcon>
                    <FaUser />
                  </ListItemIcon>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/my-orders">
                  <ListItemIcon>
                    <FaClipboardList />
                  </ListItemIcon>
                  My Orders
                </Link>
              </MenuItem>
              {user?.userType === "ADMIN" && (
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/dashboard">
                    <ListItemIcon>
                      <MdOutlineSpaceDashboard />
                    </ListItemIcon>
                    Dashboard
                  </Link>
                </MenuItem>
              )}

              <MenuItem
                onClick={() => {
                  handleSignOut();
                  handleMenuClose();
                }}
                style={{ color: "red" }}
              >
                <ListItemIcon style={{ color: "red" }}>
                  <FaSignOutAlt />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <div
              className="flex items-center"
              onClick={() => navigate("/checkout")}
            >
              <FaShoppingCart className="text-2xl cursor-pointer" />
              {cartItems.length > 0 && (
                <div className="bg-black text-white px-2 py-1 rounded-full text-xs">
                  {cartItems.length}
                </div>
              )}
            </div>
          </div>
        )}
        {!user && (
          <button
            onClick={() => navigate("/log-in")}
            className="bg-black text-white px-6 py-2 rounded-2xl"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
