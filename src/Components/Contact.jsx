import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-20">
      {/* Heading with Typewriter */}
      <h1 className="text-center text-4xl text-gray-700 dark:text-gray-200 font-bold mb-8 flex items-center justify-center gap-3">
        📞
        <Typewriter
          words={["Contact", "Contact Us"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>

      {/* Description */}
      <p className="mb-12 text-gray-700 dark:text-gray-300 flex flex-col items-center md:text-left text-lg md:text-xl">
        Have questions or need support? Reach out to us using any of the methods below. <span className="text-center mt-1">We’d love to hear from you!</span> 
      </p>
 
      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Email */}
        <div className="flex flex-col items-center md:items-start bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
          <div className="text-3xl text-[#5b46b1] mb-4">
            <FaEnvelope />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Email
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            ripon301252@gmail.com
          </p>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center md:items-start bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
          <div className="text-3xl text-[#5b46b1] mb-4">
            <FaPhone />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Phone
          </h3>
          <p className="text-gray-700 dark:text-gray-300">+880 1626607121</p>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center md:items-start bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
          <div className="text-3xl text-[#5b46b1] mb-4">
            <FaMapMarkerAlt />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Location
          </h3>
          <p className="text-gray-700 dark:text-gray-300">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center md:text-left">
        <a
          href="mailto:ripon301252@gmail.com"
          className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
        >
          Send an Email
        </a>
      </div>
    </div>
  );
};

export default Contact;
