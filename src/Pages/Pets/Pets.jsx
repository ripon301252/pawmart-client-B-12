import React, { useState, useEffect } from "react";
import PetsCard from "./PetsCard";

const Pets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("https://pawmart-server-gamma.vercel.app/pets")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-7">
      {pets.map((pet) => (
        <PetsCard key={pet._id} pet={pet} />
      ))}
    </div>
  );
};

export default Pets;
