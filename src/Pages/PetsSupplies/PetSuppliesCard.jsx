import React from "react";
import { useNavigate } from "react-router";

const PetSuppliesCard = ({ store }) => {
  const navigate = useNavigate();
  const { _id, image = '', name = '', category = '', price = 0, location = '' } = store || {};

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group">
      <title>PawMart - Pets & Supplies</title>

      {/* Image with rounded corners and hover effect */}
      <div className="overflow-hidden rounded-2xl h-56 sm:h-64 lg:h-60 p-5 border-1 border-gray-300">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
        />
      </div>

      {/* Card Info with padding */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-sm sm:text-base font-medium text-gray-700">
          {price === 0 ? "Free for Adoption" : `৳ ${price}`}
        </p>
        <p className="text-sm text-gray-500">{location}</p>
        <button
          onClick={() => navigate(`/product-details/${_id}`)}
          className="mt-3 bg-[#5633e4] hover:bg-[#654dc7] text-white text-sm sm:text-base font-medium py-2 px-4 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default PetSuppliesCard;
