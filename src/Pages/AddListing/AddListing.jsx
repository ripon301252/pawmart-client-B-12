import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"; // যদি user info context এ থাকে
import { useNavigate } from "react-router";

const AddListing = () => {
  const { user } = useContext(AuthContext); // current logged-in user
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: 0,
    location: "",
    description: "",
    image: "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add listing");

      await res.json();
      alert("Listing added successfully!");
      navigate("/myListing"); // submit করলে MyListings page এ navigate হবে
    } catch (err) {
      console.error(err);
      alert("Failed to add listing!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product / Pet Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Pets</option>
          <option>Pet Food</option>
          <option>Accessories</option>
          <option>Pet Care Products</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="bg-[#5633e4] text-white py-2 px-4 rounded hover:bg-[#654dc7]"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
