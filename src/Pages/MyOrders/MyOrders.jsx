import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch Orders
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
  }, [user?.email]);

  //  Delete Order
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this order?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/myOrders/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Order removed successfully!");
        setOrders((prev) => prev.filter((order) => order._id !== id));
      } else {
        toast.error(data.message || "Failed to remove order!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error! Try again later.");
    }
  };

  //  Generate & Download PDF Report
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("PawMart - My Orders Report", 14, 20);

    // Table
    autoTable(doc, {
      startY: 30,
      head: [
        [
          "#",
          "Product",
          "Category",
          "Price",
          "Qty",
          "Address",
          "Date",
          "Phone",
          "Owner Email",
        ],
      ],
      body: orders.map((order, i) => [
        i + 1,
        order.name,
        order.category,
        order.price === 0 ? "Free for Adoption" : `BDT ${order.price}`,
        order.quantity || 1,
        order.address || "-",
        order.date ? new Date(order.date).toLocaleDateString() : "-",
        order.phone || "-",
        order.email,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [64, 64, 64] },
    });

    // ➕ Summary
    const finalY = doc.lastAutoTable.finalY || 40;
    const totalOrders = orders.length;
    const totalPrice = orders.reduce(
      (sum, o) => sum + (o.price || 0) * (o.quantity || 1),
      0
    );
    doc.setFontSize(12);
    doc.text(
      `Summary: Total Orders = ${totalOrders}, Total Price = BDT ${totalPrice}`,
      14,
      finalY + 10
    );

    // Footer
    const date = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${date}`, 14, doc.internal.pageSize.height - 10);

    // Save PDF
    doc.save("My_Orders_Report.pdf");
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;

  if (!orders.length)
    return (
      <p className="text-center mt-10 text-lg text-gray-500">No orders found</p>
    );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <title>PawMart - My Orders</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        🐾 My Orders
      </h2>

      {/* Download Report Button */}
      <div className="flex justify-end mb-4">
        <button onClick={handleDownloadPDF} className="btn btn-primary btn-sm">
          🧩 Download Report
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Address</th>
              <th>Date</th>
              <th>Phone</th>
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
                    `BDT ${order.price}`
                  )}
                </td>
                <td>{order.quantity}</td>
                <td>{order.address || "-"}</td>
                <td>
                  {order.date ? new Date(order.date).toLocaleDateString() : "-"}
                </td>
                <td>{order.phone || "-"}</td>
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
