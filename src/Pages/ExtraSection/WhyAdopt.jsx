import React from "react";
import { FaHeart, FaHome, FaPaw, FaUsers } from "react-icons/fa";

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
    <section className="my-16 text-center px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        🐾 Why Adopt from <span className="text-orange-500">PawMart?</span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {reasons.map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100"
          >
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyAdopt;
