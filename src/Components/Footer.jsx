import React from "react";
import Img from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="backdrop-blur-lg bg-white/10 text-white">
      <div className="md:flex flex-cols-1 md:justify-between items-start py-10 md:mx-20">
        
        {/* Logo & Description */}
        <div className="mb-7 mx-5">
          <div className="flex items-center gap-2 mb-2">
            <img src={Img} alt="PawMart Logo" className="w-10 h-10" />
            <a className="text-2xl font-bold">
            <span className="text-black">Paw</span><span className="text-orange-500">Mart</span> 
            </a>
          </div>
          <p className="max-w-xs mb-3">
            PawMart connects local pet owners and buyers for adoption and pet
            care products.
          </p>

          {/* Social Icons */}
          <div className="flex items-center mt-3 gap-3">
            <a
              href="https://www.facebook.com/mahfuzur.rahman.98284"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-facebook text-3xl hover:scale-110 transition-transform duration-300 text-[#0090ff]"></i>
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter text-3xl hover:scale-110 transition-transform duration-300 text-white"></i>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-youtube text-3xl hover:scale-110 transition-transform duration-300 text-[#ff0000]"></i>
            </a>
            <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-square-instagram text-3xl hover:scale-110 transition-transform duration-300 text-[#dc3973]"></i>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="mb-7 mx-5">
          <h3 className="text-2xl mb-2 font-semibold">Useful Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div id="contact" className="mb-7 mx-5">
          <h3 className="text-2xl mb-2 font-semibold">Subscribe</h3>
          <input
            className="my-3 py-2 px-4 rounded-md text-white outline-none border-1 border-white w-full"
            type="text"
            placeholder="Enter your email"
          />
          <button className="btn backdrop-blur-lg bg-white/10 border-none shadow-none text-white px-4 py-2 rounded-md">
            Subscribe
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-300 py-4 text-sm">
        © {new Date().getFullYear()} PawMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
