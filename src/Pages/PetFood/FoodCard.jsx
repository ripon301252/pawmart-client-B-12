import React from "react";
import { Link } from "react-router";

const FoodCard = ({food}) => {
    const {  image, name, category, price, location } = food;
  return (
     <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 sm:h-56 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-sm sm:text-base font-medium text-gray-700">
          {price === 0 ? "Free for Adoption" : `৳ ${price}`}
        </p>
        <p className="text-sm text-gray-500">{location}</p>

        {/* See Details Button */}
        <Link to={`/SeeDetails/:id`} className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
