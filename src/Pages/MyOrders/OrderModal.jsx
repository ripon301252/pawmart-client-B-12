import React, { useState } from "react";
import { toast } from "react-hot-toast";

const OrderModal = ({ item, userEmail, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleConfirmOrder = async () => {
    if (!userEmail) {
      toast.error("You must be logged in to place an order");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        itemId: item._id,
        name: item.name,
        category: item.category,
        price: item.price,
        location: item.location,
        email: userEmail,
        quantity,
      };

      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully ✅");
        onClose();
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Confirm Order</h2>
        <p><strong>Product:</strong> {item.name}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Price:</strong> {item.price === 0 ? "Free for Adoption" : `৳ ${item.price}`}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Owner Email:</strong> {item.email || "Not Provided"}</p>

        <div className="mt-4">
          <label className="block mb-1">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={loading}
          className="mt-4 w-full bg-[#5633e4] hover:bg-[#654dc7] text-white py-2 rounded-lg transition"
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
