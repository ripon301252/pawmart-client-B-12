import React, { useEffect, useState } from "react";
import PetSuppliesCard from "./PetSuppliesCard";

const categories = [
  "All",
  "Pets",
  "Pet Food",
  "Accessories",
  "Pet Care Products",
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

  // Filter when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredStores(stores);
    } else {
      const filtered = stores.filter(
        (store) => store.category === selectedCategory
      );
      setFilteredStores(filtered);
    }
  }, [selectedCategory, stores]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-7">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl border font-medium transition-all duration-200 text-center
        ${
          selectedCategory === cat
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white text-gray-800 border-gray-300 hover:bg-orange-100"
        }`}
          >
            {cat}
          </button>
        ))}
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
