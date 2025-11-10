import React, { useState, useEffect } from "react";
import PetProductCard from "./PetProductCard";

const PetCareProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://pawmart-server-gamma.vercel.app/petProduct")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-7">
      {products.map((product) => (
        <PetProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default PetCareProducts;
