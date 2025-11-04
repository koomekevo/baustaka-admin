import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingDriverId, setUpdatingDriverId] = useState(null);
  const [verifyingDriverId, setVerifyingDriverId] = useState(null);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("https://vincab-backend.onrender.com/get_all_drivers/");
      const data = await res.json();
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleUpdateStatus = async (driverId, newStatus) => {
    setUpdatingDriverId(driverId);
    try {
      const res = await fetch(`https://vincab-backend.onrender.com/update_driver_status/${driverId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchDrivers();
        alert("Driver status updated successfully!");
      } else {
        alert("Failed to update driver status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingDriverId(null);
    }
  };

  const handleVerifyDriver = async (driverId) => {
    setVerifyingDriverId(driverId);
    try {
      const res = await fetch(`https://vincab-backend.onrender.com/update_driver_status/${driverId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: true }),
      });
      if (res.ok) {
        fetchDrivers();
        alert("Driver verified successfully!");
      } else {
        alert("Failed to verify driver.");
      }
    } catch (error) {
      console.error("Error verifying driver:", error);
    } finally {
      setVerifyingDriverId(null);
    }
  };

  return (
    <Layout title="Drivers">
      {loading ? (
        <p className="text-gray-600">Loading drivers...</p>
      ) : drivers.length === 0 ? (
        <p className="text-gray-600">No drivers found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Phone</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">License</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Verified</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b flex items-center space-x-3">
                    <img
                      src={driver.user.profile_image}
                      alt={driver.user.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{driver.user.full_name}</span>
                  </td>
                  <td className="p-4 border-b">{driver.user.phone_number}</td>
                  <td className="p-4 border-b">{driver.user.email}</td>
                  <td className="p-4 border-b">{driver.license_number}</td>

                  <td className="p-4 border-b">
                    <select
                      value={driver.status}
                      onChange={(e) => handleUpdateStatus(driver.id, e.target.value)}
                      className="border border-gray-300 rounded p-1 text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="busy">Busy</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>

                  <td className="p-4 border-b">
                    {driver.verified ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <button
                        onClick={() => handleVerifyDriver(driver.id)}
                        className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        {verifyingDriverId === driver.id ? "Verifying..." : "Verify"}
                      </button>
                    )}
                  </td>

                  <td className="p-4 border-b">
                    <button
                      onClick={() => handleUpdateStatus(driver.id, "active")}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm mr-2 mb-4"
                    >
                      {updatingDriverId === driver.id ? "Updating..." : "Activate"}
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(driver.id, "inactive")}
                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                    >
                      {updatingDriverId === driver.id ? "Updating..." : "Deactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Drivers;