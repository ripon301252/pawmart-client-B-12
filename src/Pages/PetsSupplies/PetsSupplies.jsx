import React, { useEffect, useState } from "react";
import PetSuppliesCard from "./PetSuppliesCard";
import {
  FaDog,
  FaDrumstickBite,
  FaBone,
  FaPills,
  FaThLarge,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const categories = [
  { name: "All", icon: FaThLarge },
  { name: "Pets", icon: FaDog },
  { name: "Pet Food", icon: FaDrumstickBite },
  { name: "Accessories", icon: FaBone },
  { name: "Pet Care Products", icon: FaPills },
];

const PetsSupplies = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all stores
  useEffect(() => {
    fetch("https://pawmart-server-three.vercel.app/stores")
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        setFilteredStores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter by category & search
  useEffect(() => {
    let filtered = [...stores];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (store) =>
          store.category?.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase()
      );
    }

    if (searchText) {
      filtered = filtered.filter((store) =>
        store.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredStores(filtered);
  }, [selectedCategory, searchText, stores]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 my-7">
      {/* Typewriter Header */}
      <h2 className="text-4xl text-gray-700 dark:text-gray-200 font-bold text-center my-12 flex items-center justify-center gap-3">
        🛒
        <Typewriter
          words={["Our Collections", "Pets & Supplies"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 my-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center justify-center sm:justify-start gap-3 px-6 py-4 text-lg sm:text-xl font-semibold transition-all duration-300 cursor-pointer shadow-md
              ${
                selectedCategory === cat.name
                  ? "text-gray-200 dark:text-gray-200 rounded-full border-gray-700 shadow-lg scale-105 backdrop-blur-lg bg-gray-700"
                  : "backdrop-blur-lg bg-white/10 text-gray-700 dark:text-gray-200 border border-gray-700 rounded-2xl hover:bg-gray-400"
              }`}
            >
              <Icon className="text-2xl" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="my-10 flex justify-center">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-700 transition-all duration-300 outline-none backdrop-blur-lg bg-white/10 text-gray-700 dark:text-gray-200"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.35a7.5 7.5 0 010 14.3z"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Stores Grid */}
      {filteredStores.length ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
          {filteredStores.map((store) => (
            <PetSuppliesCard key={store._id} store={store} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-200">
          No listings found in this category or search.
        </p>
      )}
    </div>
  );
};

export default PetsSupplies;
