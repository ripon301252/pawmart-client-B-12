import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link} from "react-router";
import { toast } from "react-hot-toast";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch listings for current user
  const fetchListings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/stores?email=${user.email}`);
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
    const confirm = window.confirm("Are you sure you want to delete this listing?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/stores/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete listing");
      toast.success("Listing deleted successfully!");
      // Remove listing from state without refetch
      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing!");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (!listings.length)
    return <p className="text-center mt-10 text-gray-700">No listings found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <title>PawMart - My Listing</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        My Listings
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white text-base">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product / Pet Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => (
              <tr key={listing._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="font-semibold">{listing.name}</td>
                <td>{listing.category}</td>
                <td>
                  {listing.price > 0 ? (
                    <span>৳ {listing.price}</span>
                  ) : (
                    <span className="text-success font-semibold">Free Adoption</span>
                  )}
                </td>
                <td>{listing.location}</td>
                <td className="flex gap-2">
                  {/* Details */}
                  <Link
                    to={`/product-details/${listing._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Details
                  </Link>
                  {/* Edit */}
                  <Link
                    to={`/editListing/${listing._id}`}
                    className="btn btn-sm btn-outline btn-secondary"
                  >
                    Edit
                  </Link>
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="btn btn-sm btn-outline btn-error"
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
