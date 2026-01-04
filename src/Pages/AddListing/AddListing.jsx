import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";

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
    status: "Available", // default
    rating: 0, // default
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
      const res = await fetch(
        "https://pawmart-server-three.vercel.app/stores",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

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
    <div className="max-w-xl mx-auto py-4 sm:py-20">
      <title>PawMart - Add Listing</title>

      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-700 dark:text-gray-200 text-center">
        🐾
        <Typewriter
          words={[" Add New Listing"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 backdrop-blur-lg bg-white/10 p-4 sm:p-6 rounded-xl shadow-md text-gray-700 dark:text-gray-200 border border-gray-700"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product / Pet Name *"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md transition"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-md transition"
        >
          <option value="Pets" className="text-black">
            Pets
          </option>
          <option value="Pet Food" className="text-black">
            Pet Food
          </option>
          <option value="Accessories" className="text-black">
            Accessories
          </option>
          <option value="Pet Care Products" className="text-black">
            Pet Care Products
          </option>
        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          disabled={isPets}
          className={`w-full p-2 border rounded-md transition ${
            isPets ? "cursor-not-allowed" : ""
          }`}
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location *"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md transition"
          required
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-md transition"
        />

        {/* Image */}
        <input
          type="text"
          name="image"
          placeholder="Image URL *"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded-md transition"
          required
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="w-full h-40 sm:h-48 rounded-md overflow-hidden shadow-sm mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md transition"
        >
          <option value="Available" className="text-black">
            Available
          </option>
          <option value="Adopted" className="text-black">
            Adopted
          </option>
        </select>

        {/* Rating */}
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded-md transition"
        >
          <option value={0} className="text-black">
            No Rating
          </option>
          <option value={1} className="text-black">
            ⭐
          </option>
          <option value={2} className="text-black">
            ⭐⭐
          </option>
          <option value={3} className="text-black">
            ⭐⭐⭐
          </option>
          <option value={4} className="text-black">
            ⭐⭐⭐⭐
          </option>
          <option value={5} className="text-black">
            ⭐⭐⭐⭐⭐
          </option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md transition"
          rows={3}
        />
        <p className="text-xs text-gray-500 text-right">
          {formData.description.length} characters
        </p>

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-2 border rounded-md cursor-not-allowed"
        />

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 backdrop-blur-lg bg-gray-700 dark:bg-white/10 text-gray-200 dark:text-gray-200 text-base sm:text-lg font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
