import React, { useState, useEffect } from "react";
import CardAccessories from "./CardAccessories";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/accessories")
      .then((res) => res.json())
      .then((data) => setAccessories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-7">
      {accessories.map((access) => (
        <CardAccessories key={access._id} access={access} />
      ))}
    </div>
  );
};

export default Accessories;
