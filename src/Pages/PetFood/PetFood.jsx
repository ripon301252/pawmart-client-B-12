import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";

const PetFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("https://pawmart-server-gamma.vercel.app/petFood")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-7">
      {foods.map((food) => (
        <FoodCard key={food._id} food={food} />
      ))}
    </div>
  );
};

export default PetFood;
