import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load your orders");
      });
  }, [user]);

  if (loading)
    return <p className="text-center mt-10">Loading your orders...</p>;

  if (orders.length === 0)
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-semibold text-gray-600">
          You haven’t placed any orders yet 😺
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Date</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td>{order.productName}</td>
                <td>
                  {order.price > 0 ? `$${order.price}` : "Free Adoption"}
                </td>
                <td>{order.quantity}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
