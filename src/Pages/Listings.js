import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get("http://192.168.100.5:4000/api/listings/all");
      setListings(res.data.listings || []);
    } catch (err) {
      console.error("❌ Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`http://192.168.100.5:4000/api/listings/delete/${id}`);
      setListings(listings.filter((l) => l.id !== id));
      alert("✅ Listing deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting listing:", err);
      alert("Failed to delete listing!");
    }
  };

  if (loading)
    return (
    <Layout title="All Listings">
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading listings...</p>
      </div>
    </Layout>
    );

  return (
    <Layout title="All Listings">
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Listings</h2>

      {listings.length === 0 ? (
        <p className="text-gray-500">No listings found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-col gap-1 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Weight:</span> {item.weight} kg
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> Ksh. {item.price}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> {item.locationName}
                  </p>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">Seller Info:</p>
                  <p>{item.User?.name || "Unknown"}</p>
                  <p>{item.User?.email}</p>
                  <p>{item.User?.phone}</p>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-auto bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 ease-in-out"
                >
                  Delete Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
}
