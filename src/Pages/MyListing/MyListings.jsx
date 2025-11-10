import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/stores?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading)
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (!listings.length)
    return <p className="text-center mt-10">No listings found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        My Listings
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-primary text-white text-base">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product / Pet Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
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
                    <span className="text-success font-semibold">
                      Free Adoption
                    </span>
                  )}
                </td>
                <td>{listing.location}</td>
                <td>
                  <Link
                    to={`/product-details/${listing._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Details
                  </Link>
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
