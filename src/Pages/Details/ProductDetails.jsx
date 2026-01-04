import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import OrderModal from "../MyOrders/OrderModal";
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pawmart-server-three.vercel.app/stores/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#5633e4] border-solid"></div>
      </div>
    );

  if (!item)
    return (
      <p className="text-center text-xl text-gray-700 dark:text-gray-200 mt-20">
        Item not found 😿
      </p>
    );

  const formatPrice = (price) =>
    price > 0
      ? new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
          maximumFractionDigits: 0,
        }).format(price)
      : "Free for Adoption 🐾";

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <title>PawMart - Product Details</title>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-700 dark:text-gray-200 font-medium transition cursor-pointer"
      >
        ← Back to Previous Page
      </button>

      {/* Main Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start backdrop-blur-lg bg-white/10 shadow-lg rounded-2xl overflow-hidden p-4 sm:p-6 border border-gray-700">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden group">
          <img
            src={item.image || "/placeholder.png"}
            alt={item.name || "Product"}
            className="w-full h-[350px] sm:h-[450px] object-cover rounded-xl transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-xl"
          />
          {item.category && (
            <span className="absolute top-4 right-4 bg-[#765ed4] text-gray-700 dark:text-gray-200 px-4 py-1 rounded-full text-sm font-semibold shadow-md">
              {item.category}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-4 sm:p-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 dark:text-gray-200 mb-3">
              {item.name || "Unknown Product"}
            </h1>

            <p className="text-gray-700 dark:text-gray-200 text-lg mb-3">
              <strong>💰 Price:</strong>{" "}
              <span className="text-gray-700 dark:text-gray-200 font-semibold">
                {formatPrice(item.price)}
              </span>
            </p>

            {/* Meta Info */}
            <div className="space-y-2 text-gray-700 dark:text-gray-200 text-base mb-4">
              <p>
                <strong>📍 Location:</strong> {item.location || "Not Provided"}
              </p>
              <p>
                <strong>📧 Owner Email:</strong> {item.email || "Not Provided"}
              </p>
              {item.ownerName && (
                <p>
                  <strong>👤 Owner Name:</strong> {item.ownerName}
                </p>
              )}
              {item.date && (
                <p>
                  <strong>📅 Pick Up Date:</strong> {item.date}
                </p>
              )}
              {item.postedAt && (
                <p>
                  <strong>🕒 Posted On:</strong>{" "}
                  {new Date(item.postedAt).toLocaleDateString()}
                </p>
              )}

              {/* Status */}
              {item.status && (
                <p className="text-green-500 font-semibold">
                  <strong>Status:</strong> {item.status}
                </p>
              )}

              {/* Rating */}
              {item.rating !== undefined && (
                <div className="flex items-center gap-1">
                  <strong>Rating:</strong>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < item.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-700 dark:text-gray-200">
                    ({item.rating}/5)
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
                {item.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Adopt / Order Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 backdrop-blur-lg bg-gray-700 dark:bg-white/10 text-gray-200 dark:text-gray-200 text-base sm:text-lg font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            🛒 Adopt / Order Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <OrderModal
          item={item}
          userEmail={user?.email}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
