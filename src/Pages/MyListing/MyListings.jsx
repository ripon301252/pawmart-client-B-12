import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch listings for current user
  const fetchListings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://pawmart-server-gamma.vercel.app/stores?email=${user.email}`
      );
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user?.email]);

  // Delete listing
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://pawmart-server-gamma.vercel.app/stores/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete listing");
      toast.success("Listing deleted successfully!");
      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner text-primary text-4xl"></span>
      </div>
    );

  if (!listings.length)
    return (
      <p className="text-center mt-10 text-gray-700 text-lg">
        No listings found!
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-5">
      <title>PawMart - My Listing</title>
      <h2 className="text-4xl text-white font-bold my-12 text-center">
        🐾
        <Typewriter
          words={[" My Listings"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full border-collapse text-left">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product / Pet Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => (
              <tr
                key={listing._id}
                className="even:bg-white/5 odd:bg-white/10 text-white transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{listing.name}</td>
                <td className="px-4 py-3">{listing.category}</td>
                <td className="px-4 py-3">
                  {listing.price > 0 ? (
                    <span>৳ {listing.price}</span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Free Adoption
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{listing.location}</td>
                <td className="px-4 py-3 flex flex-wrap gap-2 mt-5">
                  <Link
                    to={`/product-details/${listing._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/editListing/${listing._id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden flex flex-col gap-4">
        {listings.map((listing, index) => (
          <div
            key={listing._id}
            className={`rounded-lg shadow-md p-4 flex flex-col gap-3 ${
              index % 2 === 0 ? "bg-white/5" : "bg-white/10"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">
                {index + 1}. {listing.name}
              </span>
              <span className="text-sm text-gray-500">{listing.category}</span>
            </div>
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
              <span>
                Price:{" "}
                {listing.price > 0 ? `৳ ${listing.price}` : "Free Adoption"}
              </span>
              <span>Location: {listing.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link
                to={`/product-details/${listing._id}`}
                className="flex-1 text-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Details
              </Link>
              <Link
                to={`/editListing/${listing._id}`}
                className="flex-1 text-center px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(listing._id)}
                className="flex-1 text-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
