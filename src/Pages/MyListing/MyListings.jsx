import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/stores?email=${user.email}`
      );
      const data = await res.json();
      setListings(data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch listings!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Listing?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:5000/stores/${id}`, {
          method: "DELETE",
        });
        setListings((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Listing removed successfully.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete listing.", "error");
      }
    }
  };

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary text-5xl"></span>
      </div>
    );
  }

  /* ---------------- Empty ---------------- */
  if (!listings.length) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl font-semibold text-gray-500">
          😿 No listings found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <title>PawMart - My Listings</title>

      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
        🐾
        <Typewriter
          words={[" My Listings"]}
          loop
          cursor
          cursorStyle="_"
          typeSpeed={80}
          delaySpeed={1200}
        />
      </h2>

      {/* Mobile scroll hint */}
      <p className="text-sm text-gray-400 mb-2 text-right lg:hidden">
        ⬅ Swipe horizontally ➡
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-[900px] w-full border-collapse">
          {/* Sticky Header */}
          <thead className="bg-primary text-white sticky top-0 z-10">
            <tr>
              <th className="px-5 py-4 text-left">#</th>
              <th className="px-5 py-4 text-left">Image</th>
              <th className="px-5 py-4 text-left">Name</th>
              <th className="px-5 py-4 text-left">Category</th>
              <th className="px-5 py-4 text-left">Price</th>
              <th className="px-5 py-4 text-left">Location</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {listings.map((listing, index) => (
              <tr
                key={listing._id}
                className={`border-b border-gray-200 dark:border-gray-700
                  transition-all duration-200
                  ${
                    index % 2 === 0
                      ? "bg-white dark:bg-base-200"
                      : "bg-gray-50 dark:bg-base-300"
                  }
                  hover:bg-primary/10 dark:hover:bg-primary/20
                `}
              >
                <td className="px-5 py-4 font-medium">{index + 1}</td>

                <td className="px-5 py-4">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-14 h-14 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-600"
                  />
                </td>

                <td className="px-5 py-4 font-semibold">{listing.name}</td>

                <td className="px-5 py-4">{listing.category}</td>

                <td className="px-5 py-4">
                  {listing.price > 0 ? (
                    <span className="font-medium">৳ {listing.price}</span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Free Adoption
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">{listing.location}</td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {/* View Details */}
                    <Link
                      to={`/product-details/${listing._id}`}
                      className="btn btn-md btn-info btn-square text-white tooltip"
                      data-tip="View Details"
                    >
                      <FaEye className="text-lg" />
                    </Link>

                    {/* Add Listing */}
                    <Link
                      to="/addListing"
                      className="btn btn-md btn-success btn-square text-white tooltip"
                      data-tip="Add New Listing"
                    >
                      <FaPlus className="text-lg" />
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/editListing/${listing._id}`}
                      className="btn btn-md btn-warning btn-square text-white tooltip"
                      data-tip="Edit Listing"
                    >
                      <FaEdit className="text-lg" />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="btn btn-md btn-error btn-square text-white tooltip"
                      data-tip="Delete Listing"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
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
