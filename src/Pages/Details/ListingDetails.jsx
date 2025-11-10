import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const ListingDetails = () => {
  const { category, id } = useParams();
  const { user: currentUser } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [orderData, setOrderData] = useState({
    productId: "",
    productName: "",
    buyerName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    category: "",
    location: "",
    quantity: 1,
    price: 0,
    address: "",
    phone: "",
    additionalNotes: "",
  });

  // Fetch single item
  useEffect(() => {
    fetch(`http://localhost:5000/${category}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category, id]);

  // Pre-fill orderData
  useEffect(() => {
    if (item) {
      setOrderData((prev) => ({
        ...prev,
        productId: item._id,
        productName: item.name,
        email: currentUser?.email || "",
        category: item.category,
        location: item.location,
        price: item.price,
        quantity: item.category === "Pets" ? 1 : 1,
      }));
    }
  }, [item, currentUser]);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Order placed successfully!");
        setShowModal(false);
      })
      .catch(() => toast.error("Failed to place order!"));
  };

  if (loading) return <p className="text-center mt-10">Loading item details...</p>;
  if (!item) return <p className="text-center mt-10 text-red-500">Item not found!</p>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-3">{item.name}</h2>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Owner’s Email:</strong> {item.email || "N/A"}</p>
      <p><strong>Price:</strong> {item.price > 0 ? `৳ ${item.price}` : "Free for Adoption"}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <img src={item.image} alt={item.name} className="my-4 w-full h-80 object-cover rounded-md" />
      <p className="mb-3">{item.description}</p>

      <button
        onClick={() => setShowModal(true)}
        className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition"
      >
        Adopt / Order Now
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-bold mb-4">Place Your Order</h3>
            <form onSubmit={handleOrderSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="buyerName"
                placeholder="Your Name"
                value={orderData.buyerName}
                onChange={handleOrderChange}
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={orderData.email}
                readOnly
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="category"
                value={orderData.category}
                readOnly
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="location"
                value={orderData.location}
                readOnly
                className="border px-3 py-2 rounded"
              />
              {item.category !== "Pets" && (
                <input
                  type="number"
                  name="quantity"
                  value={orderData.quantity}
                  onChange={handleOrderChange}
                  className="border px-3 py-2 rounded"
                  min={1}
                  required
                />
              )}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={orderData.address}
                onChange={handleOrderChange}
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={orderData.phone}
                onChange={handleOrderChange}
                className="border px-3 py-2 rounded"
                required
              />
              <textarea
                name="additionalNotes"
                placeholder="Additional Notes"
                value={orderData.additionalNotes}
                onChange={handleOrderChange}
                className="border px-3 py-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                  Submit Order
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
