import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 md:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <a href="#menu" className="hover:underline">
                Menu
              </a>
            </li>
            <li className="mb-2">
              <a href="#about" className="hover:underline">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li className="mb-2">
              <a href="#locations" className="hover:underline">
                Locations
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-blue-500">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://instagram.com" className="hover:text-pink-600">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-700">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8">
        <p>&copy; 2024 Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
