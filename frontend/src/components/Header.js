import React, { useState, useEffect } from "react";
import { FaHome, FaTools, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, signOut } from "../store/userSlice";
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
              <UserAvatar user={user} />
            </div>
            <div
              className="flex items-center"
              onClick={() => navigate("/checkout")}
            >
              <FaShoppingCart className="text-2xl cursor-pointer" />
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleSignOut()}
                className="bg-black text-white px-6 py-2 rounded-2xl"
              >
                Sign Out
              </button>
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
