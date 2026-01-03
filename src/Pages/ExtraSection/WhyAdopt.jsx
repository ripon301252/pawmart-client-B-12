import React from "react";
import { FaHeart, FaHome, FaPaw, FaUsers } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const WhyAdopt = () => {
  const reasons = [
    {
      icon: <FaHeart className="text-pink-500 text-3xl" />,
      title: "Give Love a Home",
      desc: "Thousands of pets are waiting for a loving family. Adoption gives them a second chance.",
    },
    {
      icon: <FaPaw className="text-orange-500 text-3xl" />,
      title: "Save a Life",
      desc: "Every adoption helps reduce the number of stray animals and supports responsible pet care.",
    },
    {
      icon: <FaHome className="text-blue-500 text-3xl" />,
      title: "Build a Family",
      desc: "Pets bring joy, comfort, and unconditional love into your home.",
    },
    {
      icon: <FaUsers className="text-green-500 text-3xl" />,
      title: "Join a Caring Community",
      desc: "PawMart connects pet lovers, rescuers, and adopters across the country.",
    },
  ];

  return (
    <section className="my-16 text-center p-1">
      <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-200 mb-8">
        🐾
        <Typewriter
          words={["Home", "Why Adopt from PawMart?"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {reasons.map((item, i) => (
          <div
            key={i}
            className="p-6 backdrop-blur-lg bg-white/10 rounded-xl shadow hover:shadow-lg transition-all  hover:scale-105 border border-gray-700"
          >
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <h3 className="text-lg text-gray-700 dark:text-gray-200 font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyAdopt;
