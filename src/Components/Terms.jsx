import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Terms = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* Heading with Typewriter */}
      <h1 className="text-center text-4xl text-gray-700 dark:text-gray-200 font-bold mb-8 flex items-center justify-center gap-3">
        🐾
        <Typewriter
          words={["Terms & Conditions"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>

      {/* Introduction */}
      <p className="mb-8 text-gray-700 dark:text-gray-300 text-lg md:text-xl text-center">
        By accessing and using{" "}
        <span className="font-semibold text-orange-500">PawMart</span>, you
        agree to comply with and be bound <br /> by these terms and conditions.
      </p>

      {/* Terms List */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            1. General Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            PawMart provides information and services for general purposes only.
            We do not guarantee the accuracy or reliability of listings provided
            by third-party sellers.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            2. User Responsibilities
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Users must provide accurate information while using PawMart and are
            responsible for maintaining the security of their accounts.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100 ">
            3. Modifications
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            PawMart reserves the right to update or modify these terms at any
            time without prior notice. Continued use of the platform constitutes
            acceptance of the updated terms.
          </p>
        </div>
      </div>

      {/* CTA / Contact */}
      <div className="mt-12 text-center md:text-left">
        <a
          href="/contact"
          className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
        >
          Need Help? Contact Us
        </a>
      </div>
    </div>
  );
};

export default Terms;
