import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaDog,
  FaDrumstickBite,
  FaBone,
  FaPills,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

// Skeleton loader for loading state
const SkeletonCard = () => (
  <div className="rounded-2xl border border-gray-700 bg-white/10 backdrop-blur-lg p-5 animate-pulse min-h-[520px]">
    <div className="h-56 w-full bg-gray-300 dark:bg-gray-600 rounded-2xl mb-5"></div>
    <div className="space-y-3">
      <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
    <div className="mt-6 h-12 w-full bg-gray-400 dark:bg-gray-500 rounded-lg"></div>
  </div>
);

const RecentList = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Pets");
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Pets", icon: <FaDog /> },
    { name: "Pet Food", icon: <FaDrumstickBite /> },
    { name: "Accessories", icon: <FaBone /> },
    { name: "Pet Care Products", icon: <FaPills /> },
  ];

  // Fetch stores by selected category
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://pawmart-server-three.vercel.app/stores-list?category=${encodeURIComponent(
        selectedCategory
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [selectedCategory]);

  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

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
    <div className="p-1">
      {/* Page Title */}
      <h1 className="text-center text-4xl text-gray-700 dark:text-gray-200 font-bold mt-14 mb-8 flex items-center justify-center gap-3">
        🐾
        <Typewriter
          words={["Home", "Recent List"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 my-10">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center justify-center sm:justify-start gap-3 px-6 py-5 text-lg sm:text-xl font-semibold transition-all duration-300 cursor-pointer shadow ${
              selectedCategory === cat.name
                ? "text-gray-200 dark:text-gray-200 rounded-full border-gray-700 shadow-lg scale-105 backdrop-blur-lg bg-gray-700"
                : "backdrop-blur-lg bg-white/10 text-gray-700 dark:text-gray-200 border border-gray-700 rounded-2xl hover:bg-gray-400"
            }`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="hidden sm:inline">{cat.name}</span>
            <span className="sm:hidden">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : stores.slice(0, 8).map((item) => {
              // Default values if API doesn't provide
              const description =
                item.description ?? "No description available.";
              const rating = item.rating ?? 4;
              const status = item.status ?? "Available";

              return (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ duration: 0.3 }}
                  className="min-h-[520px] rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col border border-gray-700 backdrop-blur-lg bg-white/10"
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-2xl h-56 sm:h-64 lg:h-60 p-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
                    />
                  </div>

                  {/* Card Info */}
                  <div className="p-6 flex flex-col gap-2 flex-grow">
                    <h3 className="text-2xl sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {item.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2">
                      {description}
                    </p>

                    {/* Meta Info */}
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      <strong>Category:</strong> {item.category}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      <strong>Price:</strong> {formatPrice(item.price)}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      <strong>Location:</strong> {item.location}
                    </p>

                    {/* Status */}
                    <p className="text-sm text-green-500 font-semibold">
                      {status}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < rating ? "text-yellow-400" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    {/* View Details */}
                    <button
                      onClick={() =>
                        navigate(
                          `/${selectedCategory
                            .toLowerCase()
                            .replace(/\s/g, "")}/${item._id}`
                        )
                      }
                      className="mt-4 backdrop-blur-lg bg-gray-700 dark:bg-white/10 text-gray-200 dark:text-gray-200 text-base sm:text-lg font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                      aria-label={`See details of ${item.name}`}
                    >
                      See Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default RecentList;
