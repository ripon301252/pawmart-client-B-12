import React, { useState } from "react";
import Img from "../assets/logo.png";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return toast.error("Please enter your email");
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={Img} alt="PawMart Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">
              Paw<span className="text-orange-500">Mart</span>
            </h1>
          </div>
          <p className="text-sm">
            PawMart connects pet lovers with trusted adoption services and pet
            care products.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 text-2xl mt-4">
            <a
              href="https://www.facebook.com/mahfuzur.rahman.98284"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://x.com/your_username"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-400"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/your_username"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-600"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com/@your_channel"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-600"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: ripon301252@gmail.com.com</li>
            <li>Phone: +880 1626607121</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
          <p className="text-sm mb-2">
            Get updates about new pets & offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md border outline-none text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition cursor-pointer"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} PawMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
