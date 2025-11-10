import React, { useState, useEffect } from "react";
import AllCategories from "./AllCategories";

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // useEffect দিয়ে server থেকে data আনবে
  useEffect(() => {
    fetch("https://pawmart-server-gamma.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSelect = (name) => {
    setActiveCategory(name);
    onCategorySelect(name);
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between my-10 gap-4">
      {categories.map((category) => (
        <AllCategories
          key={category.name}
          category={category}
          onCategorySelect={handleSelect}
          isActive={activeCategory === category.name}
        />
      ))}
    </div>
  );
};

export default Categories;
