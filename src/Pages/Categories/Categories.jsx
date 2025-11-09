import React, { useState } from 'react';
import AllCategories from './AllCategories';

const categories = [
  { name: 'Pets', icon: '🐶' },
  { name: 'Pet Food', icon: '🍖' },
  { name: 'Accessories', icon: '🧸' },
  { name: 'Pet Care Products', icon: '💊' },
];

const Categories = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelect = (name) => {
    setActiveCategory(name);
    onCategorySelect(name);
  };

  return (
    <div className='flex lg:flex-row flex-col justify-between my-10 gap-4'>
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
