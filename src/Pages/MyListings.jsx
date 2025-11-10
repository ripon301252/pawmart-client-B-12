import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = () => {
    fetch(`http://localhost:5000/listings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch listings!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/listings/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Listing deleted successfully!");
          fetchListings(); // Refresh the list
        } else {
          toast.error("Failed to delete listing!");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete listing!");
      });
  };

  if (loading) return <p className="text-center mt-10">Loading your listings...</p>;

  if (listings.length === 0)
    return <p className="text-center mt-10">You have no listings yet!</p>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5">My Listings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Location</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2">{item.category}</td>
                <td className="border px-3 py-2">{item.price > 0 ? `$${item.price}` : "Free for Adoption"}</td>
                <td className="border px-3 py-2">{item.location}</td>
                <td className="border px-3 py-2 flex justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => toast.info("Update modal or route opens here")}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
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

export default MyListings;
