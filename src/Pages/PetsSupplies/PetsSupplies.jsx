import React, { useEffect, useState } from "react";
import PetSuppliesCard from "./PetSuppliesCard";
import { FaDog, FaDrumstickBite, FaBone, FaPills, FaThLarge } from "react-icons/fa";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/stores")
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        setFilteredStores(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredStores(stores);
    } else {
      const filtered = stores.filter(
        (store) =>
          store.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredStores(filtered);
    }
  }, [selectedCategory, stores]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 my-7">
      <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        <span className="text-4xl">🛒</span> Our <span className="text-[#5633e4]">Collections</span>
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 my-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center justify-center sm:justify-start gap-3 px-6 py-4 text-lg sm:text-xl font-semibold transition-all duration-300 cursor-pointer shadow-md
              ${
                selectedCategory === cat.name
                  ? "bg-[#5633e4] text-white rounded-full shadow-lg scale-105"
                  : "bg-gray-300 hover:text-white border-1 border-gray-300 rounded-2xl hover:bg-gray-400"
              }`}
            >
              <Icon className="text-2xl" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Stores Grid */}
      {filteredStores.length ? (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
          {filteredStores.map((store) => (
            <PetSuppliesCard key={store._id} store={store} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No listings found in this category.
        </p>
      )}
    </div>
  );
};

export default PetsSupplies;
