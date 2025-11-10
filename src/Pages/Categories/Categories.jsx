import React, { useEffect, useState } from "react";

const Categories = () => {
  const [stores, setStores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Pets"); // ডিফল্ট ক্যাটেগরি

  useEffect(() => {
    fetch("http://localhost:5000/stores")
      .then(res => res.json())
      .then(data => setStores(data))
      .catch(err => console.log(err));
  }, []);

  // ক্যাটেগরি অনুযায়ী ফিল্টার করা
  const filteredItems = stores
    .filter(item => item.category === selectedCategory)
    .slice(0, 6); // শুধুমাত্র ৬টি আইটেম

  const categories = ["Pets", "Pet Food", "Accessories", "Pet Care Products"];

  return (
    <div>
      {/* ক্যাটেগরি বোতাম */}
      <div style={{ marginBottom: "20px" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              marginRight: "10px",
              padding: "10px 15px",
              backgroundColor: selectedCategory === cat ? "#4caf50" : "#eee",
              color: selectedCategory === cat ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* আইটেমগুলো দেখানো */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {filteredItems.map(item => (
          <div
            key={item._id}
            style={{ border: "1px solid #ccc", padding: "10px", width: "150px" }}
          >
            <img src={item.image} alt={item.name} style={{ width: "100%" }} />
            <h4>{item.name}</h4>
            <p>{item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
