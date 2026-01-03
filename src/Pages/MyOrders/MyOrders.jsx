import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaTrash, FaFilePdf } from "react-icons/fa";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Orders ---------------- */
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/myOrders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load orders!", "error");
        setLoading(false);
      });
  }, [user?.email]);

  /* ---------------- Delete Order ---------------- */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Remove Order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, Remove",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:5000/myOrders/${id}`, {
          method: "DELETE",
        });
        setOrders((prev) => prev.filter((o) => o._id !== id));
        Swal.fire("Removed!", "Order deleted successfully.", "success");
      } catch {
        Swal.fire("Error!", "Failed to remove order.", "error");
      }
    }
  };

  /* ---------------- PDF ---------------- */
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("PawMart - My Orders Report", 14, 12);

    const columns = [
      "Product",
      "Category",
      "Price",
      "Qty",
      "Address",
      "Date",
      "Phone",
      "Email",
    ];

    const rows = orders.map((order) => [
      order.name,
      order.category,
      order.price === 0 ? "Free for Adoption" : `৳ ${order.price}`,
      order.quantity || 1,
      order.address || "-",
      order.date ? new Date(order.date).toLocaleDateString() : "-",
      order.phone || "-",
      order.email,
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save("My_Orders_Report.pdf");
  };

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary text-5xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <title>PawMart - My Orders</title>

      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        🐾
        <Typewriter
          words={[" My Orders"]}
          loop
          cursor
          cursorStyle="_"
          typeSpeed={70}
          delaySpeed={1200}
        />
      </h2>

      {/* Actions */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-400 lg:hidden">
          ⬅ Swipe horizontally ➡
        </p>

        <button
          onClick={handleDownloadPDF}
          className="btn btn-sm btn-success flex items-center gap-2"
        >
          <FaFilePdf />
          Download PDF
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-[1100px] w-full border-collapse">
          {/* Sticky Header */}
          <thead className="bg-primary text-white sticky top-0 z-10">
            <tr>
              {[
                "#",
                "Product",
                "Category",
                "Price",
                "Qty",
                "Address",
                "Date",
                "Phone",
                "Owner Email",
                "Action",
              ].map((head) => (
                <th key={head} className="px-5 py-4 text-left">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {orders.length ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`border-b border-gray-200 dark:border-gray-700
                    transition-all
                    ${
                      index % 2 === 0
                        ? "bg-white dark:bg-base-200"
                        : "bg-gray-50 dark:bg-base-300"
                    }
                    hover:bg-primary/10 dark:hover:bg-primary/20
                  `}
                >
                  <td className="px-5 py-4 font-medium">{index + 1}</td>
                  <td className="px-5 py-4 font-semibold">{order.name}</td>
                  <td className="px-5 py-4">{order.category}</td>
                  <td className="px-5 py-4">
                    {order.price === 0
                      ? "Free for Adoption"
                      : `৳ ${order.price}`}
                  </td>
                  <td className="px-5 py-4">{order.quantity || 1}</td>
                  <td className="px-5 py-4">{order.address || "-"}</td>
                  <td className="px-5 py-4">
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-5 py-4">{order.phone || "-"}</td>
                  <td className="px-5 py-4">{order.email}</td>

                  {/* Action */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-md btn-error btn-square tooltip"
                      data-tip="Remove Order"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-10 text-gray-400">
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
