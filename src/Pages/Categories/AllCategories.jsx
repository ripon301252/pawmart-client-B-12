import React from 'react';

const AllCategories = ({ category, onCategorySelect, isActive }) => {
  const { icon, name } = category;

  return (
    <button
      onClick={() => onCategorySelect(name)}
      className={`
        flex items-center gap-3
        border rounded-xl px-4 py-3 w-full sm:w-auto
        transition-all duration-300 cursor-pointer
        ${isActive
          ? "bg-orange-500 text-white shadow-md border-orange-600"
          : "bg-white text-gray-800 border-gray-200 hover:bg-orange-100 hover:shadow-md"
        }
      `}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-base font-medium">{name}</span>
    </button>
  );
};

export default AllCategories;
