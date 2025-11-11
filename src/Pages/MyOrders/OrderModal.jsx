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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#5633e4] to-[#654dc7] text-white p-4 text-center">
          <h2 className="text-2xl font-bold">Confirm Your Order</h2>
          <p className="text-sm mt-1">Review your product details before ordering</p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-4">
          
          {/* Left: Info + Quantity + Confirm Button */}
          <div className="flex-1 space-y-3">
            <p><strong>Product:</strong> {item.name}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p>
              <strong>Price:</strong>{" "}
              {item.price === 0 ? (
                <span className="text-green-600 font-semibold">Free for Adoption 🐾</span>
              ) : (
                <span className="text-[#5633e4] font-semibold">৳ {item.price}</span>
              )}
            </p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Owner Email:</strong> {item.email || "Not Provided"}</p>

            {/* Quantity */}
            <div>
              <label className="block mb-1 font-medium">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition"
              />
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={loading}
              className={`w-full mt-3 py-3 rounded-lg font-semibold text-white transition-transform transform hover:scale-105 cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#5633e4] to-[#654dc7] hover:opacity-90"
              }`}
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>

          {/* Right: Product Image + Close Button */}
          <div className="flex-shrink-0 w-full sm:w-48 lg:w-56 flex flex-col items-center gap-3 group">
            <div className="w-full h-48 sm:h-56 lg:h-60 rounded-xl overflow-hidden shadow-md transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#5633e4] hover:bg-[#6044cf] text-white rounded-lg font-semibold transition transform hover:scale-105 w-full text-center mt-5 cursor-pointer"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderModal;
