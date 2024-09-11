import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="py-8 px-4 md:px-8 relative text-yellow-900 bg-white bg-opacity-80"
      style={{
        background: "linear-gradient(to right, #fcd34d, #fbbf24, #fef08a)",
        borderRadius: "10px", // Add this line to make the corners rounded
      }}
    >
      <div
        className="absolute inset-0 bg-white opacity-90"
        aria-hidden="true"
        style={{ borderRadius: "10px" }} // Add borderRadius here if necessary
      ></div>
      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p>123 Main Street</p>
          <p>Colombo, Sri Lanka</p>
          <p>Email: info@restaurant.com</p>
          <p>Phone: +94 123 456 789</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <a
                href="#menu"
                className="hover:underline text-gray-800 hover:text-yellow-700"
              >
                Menu
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#about"
                className="hover:underline text-gray-800 hover:text-yellow-700"
              >
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#contact"
                className="hover:underline text-gray-800 hover:text-yellow-700"
              >
                Contact
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#locations"
                className="hover:underline text-gray-800 hover:text-yellow-700"
              >
                Locations
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-yellow-700">
            <a href="https://facebook.com" className="hover:text-blue-500 ">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400">
              <FaXTwitter />
            </a>
            <a href="https://instagram.com" className="hover:text-pink-600">
              <FaInstagramSquare />
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative text-center mt-8 text-gray-800">
        <p>&copy; 2024 Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
