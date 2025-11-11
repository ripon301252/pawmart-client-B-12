import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: 0,
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });

  const [isPets, setIsPets] = useState(true);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    setIsPets(formData.category === "Pets");
    if (formData.category === "Pets") {
      setFormData((prev) => ({ ...prev, price: 0 }));
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setImagePreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.image) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add listing");
      await res.json();
      toast.success("Listing added successfully!");
      navigate("/myListing");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add listing!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 ">
      <title>PawMart - Add Listing</title>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white text-center">
        Add New Listing
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 backdrop-blur-lg bg-white/10 p-4 sm:p-6 rounded-xl shadow-md text-white"
      >
        <input
          type="text"
          name="name"
          placeholder="Product / Pet Name *"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition"
        >
          <option className="text-black">Pets</option>
          <option className="text-black">Pet Food</option>
          <option className="text-black">Accessories</option>
          <option className="text-black">Pet Care Products</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          disabled={isPets}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition ${
            isPets ? " cursor-not-allowed" : ""
          }`}
        />

        <input
          type="text"
          name="location"
          placeholder="Location *"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition "
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL *"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition"
          required
        />

        {imagePreview && (
          <div className="w-full h-40 sm:h-48 rounded-md overflow-hidden shadow-sm mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition"
          rows={3}
        ></textarea>
        <p className="text-xs text-gray-500 text-right">
          {formData.description.length} characters
        </p>

        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-2 border rounded-md cursor-not-allowed"
        />

        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-[#5633e4] to-[#654dc7] text-white py-2 rounded-md font-semibold hover:opacity-90 transition-transform transform hover:scale-105"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
