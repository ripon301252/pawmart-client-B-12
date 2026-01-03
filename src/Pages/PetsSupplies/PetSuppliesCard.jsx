import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const PetSuppliesCard = ({ store }) => {
  const navigate = useNavigate();

  const {
    _id,
    image = "",
    name = "",
    description = "",
    category = "",
    price = 0,
    location = "",
    email = "",
    status = "Available",
    rating = 0,
    date,
  } = store || {};

  // Format price
  const formatPrice = (price) =>
    price > 0
      ? new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
          maximumFractionDigits: 0,
        }).format(price)
      : "Free for Adoption";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="min-h-[520px] rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col border border-gray-700 backdrop-blur-lg bg-white/10"
    >
      {/* Image */}
      <div className="h-56 p-5">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Card Info */}
      <div className="p-6 flex flex-col gap-2 flex-grow">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description || "No description available."}
        </p>

        {/* Meta Info */}
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <strong>Category:</strong> {category}
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-200">
          <strong>Price:</strong> {formatPrice(price)}
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-200">
          <strong>Location:</strong> {location}
        </p>

        {email && (
          <p className="text-sm text-gray-700 dark:text-gray-200">
            <strong>Email:</strong> {email}
          </p>
        )}

        {/* Status Badge */}
        {status && (
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full w-fit
              ${
                status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {status}
          </span>
        )}

        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Number(rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        )}

        {/* Date */}
        {date && (
          <p className="text-xs text-gray-500">
            Added on: {new Date(date).toLocaleDateString()}
          </p>
        )}

        {/* View Details */}
        <button
          onClick={() =>
            navigate(`/${category.toLowerCase().replace(/\s/g, "")}/${_id}`)
          }
          className="mt-4 backdrop-blur-lg bg-gray-700 dark:bg-white/10 text-gray-200 text-base sm:text-lg font-semibold py-3 rounded-lg transition-transform hover:scale-105 cursor-pointer"
        >
          See Details
        </button>
      </div>
    </motion.div>
  );
};

export default PetSuppliesCard;
