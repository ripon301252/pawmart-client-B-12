import React, { useState, useEffect } from "react";
import StoreCard from "../Pages/StoreCard";

const RecentStore = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetch("https://pawmart-server-gamma.vercel.app/recent-stores")
      .then((res) => res.json())
      .then((data) => setStores(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-6">
      {stores.slice(0, 6).map((store) => (
        <StoreCard key={store._id} store={store} />
      ))}
    </div>
  );
};

export default RecentStore;
