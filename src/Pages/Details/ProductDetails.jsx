import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";

import { AuthContext } from "../../Context/AuthContext";
import OrderModal from "../MyOrders/OrderModal";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/stores/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!item) return <p className="text-center mt-10">Item not found</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-[#5633e4] hover:underline"
      >
        ← Back
      </button>

      <img
        src={item.image}
        alt={item.name}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
      <p className="text-gray-600 mb-2"><strong>Category:</strong> {item.category}</p>
      <p className="text-gray-800 mb-2"><strong>Price:</strong> {item.price > 0 ? `৳ ${item.price}` : "Free for Adoption"}</p>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {item.location}</p>
      <p className="text-gray-700 mb-2"><strong>Owner's Email:</strong> {item.email || "Not Provided"}</p>
      <p className="text-gray-700">{item.description}</p>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-6 bg-[#5633e4] text-white py-3 px-6 rounded-lg hover:bg-[#654dc7] transition"
      >
        🛒 Adopt / Order Now
      </button>

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
