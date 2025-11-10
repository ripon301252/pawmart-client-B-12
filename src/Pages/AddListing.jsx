import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";

const AddListing = () => {
  const { user: currentUser } = useContext(AuthContext);

  const handleAddListingSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const listingData = {
      name: form.name.value,
      category: form.category.value,
      price: form.category.value === "Pets" ? 0 : parseFloat(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: currentUser.email, // readonly
    };

    fetch("http://localhost:5000/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Listing added successfully!");
          form.reset();
        } else {
          toast.error("Failed to add listing!");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add listing!");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5">Add New Listing</h2>
      <form onSubmit={handleAddListingSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product/Pet Name"
          className="border px-3 py-2 rounded"
          required
        />
        <select
          name="category"
          className="border px-3 py-2 rounded"
          required
        >
          <option value="Pets">Pets</option>
          <option value="Pet Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Pet Care Products">Pet Care Products</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={currentUser.email}
          readOnly
          className="border px-3 py-2 rounded bg-gray-100"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
