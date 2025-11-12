import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/myOrders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load orders!");
        setLoading(false);
      });
  }, [user?.email]);

  // Delete Order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this order?")) return;

    try {
      const res = await fetch(`http://localhost:5000/myOrders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete order");
      toast.success("Order removed successfully!");
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove order!");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-semibold text-white">
        Loading...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto py-4 md:p-8">
      <title>PawMart - My Orders</title>

      {/* Heading */}
      <h2 className="text-4xl md:text-4xl font-bold pb-12  text-center text-white flex justify-center items-center gap-3">
        🐾
        <Typewriter
          words={["My Orders"]}
          loop
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-primary text-white text-base md:text-lg font-semibold">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Owner Email</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`transition-colors text-white text-sm md:text-base hover:bg-white/20 ${
                    index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                  }`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{order.name}</td>
                  <td className="px-4 py-3">{order.category}</td>
                  <td className="px-4 py-3">{order.price === 0 ? "Free for Adoption" : `৳ ${order.price}`}</td>
                  <td className="px-4 py-3">{order.quantity || 1}</td>
                  <td className="px-4 py-3">{order.address || "-"}</td>
                  <td className="px-4 py-3">{order.date ? new Date(order.date).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-3">{order.phone || "-"}</td>
                  <td className="px-4 py-3">{order.email}</td>
                  <td className="px-4 py-3 flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm md:text-base"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-gray-400 py-6">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
