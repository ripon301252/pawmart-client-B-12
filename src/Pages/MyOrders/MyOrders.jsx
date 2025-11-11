import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for logged-in user
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
      });
  }, [user]);

  // Handle delete order
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to remove this order?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order removed successfully!");
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        toast.error(data.message || "Failed to remove order!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error! Try again later.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;

  if (!orders.length)
    return (
      <p className="text-center mt-10 text-lg text-gray-500">No orders found</p>
    );

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <title>PawMart - My Orders</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        🐾 My Orders
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Location</th>
              <th>Owner Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover">
                <th>{index + 1}</th>
                <td>{order.name}</td>
                <td>{order.category}</td>
                <td>
                  {order.price === 0 ? (
                    <span className="text-success font-medium">
                      Free for Adoption
                    </span>
                  ) : (
                    `৳ ${order.price}`
                  )}
                </td>
                <td>{order.quantity}</td>
                <td>{order.location}</td>
                <td>{order.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
