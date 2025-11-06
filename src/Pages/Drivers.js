import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: "", phone: "", vehicleNumber: "" });
  const [assignModal, setAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const API_URL = "https://baustaka-backend.onrender.com/api/drivers";

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(API_URL);
      setDrivers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  const addDriver = async () => {
    try {
       const res = await axios.post(API_URL, newDriver);
       if (res.data.success) {
        alert("Driver added successfully");
      }else{
        alert("Driver not added");
      }
      setNewDriver({ name: "", phone: "", truckNumber: "", email: "", licenceNumber: "" });
      fetchDrivers();
    } catch (err) {
      console.error("Error adding driver:", err);
    }
  };

  const deleteDriver = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.data.success) {
        alert("Driver deleted successfully");
      }else{
        alert("Driver not deleted");
      }
      fetchDrivers();
    } catch (err) {
      console.error("Error deleting driver:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}/status`, { status });
      fetchDrivers();
    } catch (err) {
      console.error("Error updating driver status:", err);
    }
  };

  const assignDriver = async () => {
    try {
      await axios.post(`${API_URL}/assign`, {
        orderId: selectedOrder,
        driverId: selectedDriver,
      });
      setAssignModal(false);
      setSelectedDriver(null);
    } catch (err) {
      console.error("Error assigning driver:", err);
    }
  };

  return (
    <Layout title="Drivers">
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Drivers Management</h2>

      {/* Add Driver Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Add New Driver</h3>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newDriver.name}
            onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
            className="border rounded p-2 flex-1"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newDriver.phone}
            onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
            className="border rounded p-2 flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newDriver.email}
            onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
            className="border rounded p-2 flex-1"
          />
          <input
            type="text"
            placeholder="licence number"
            value={newDriver.licenceNumber}
            onChange={(e) => setNewDriver({ ...newDriver, licenceNumber: e.target.value })}
            className="border rounded p-2 flex-1"
          />
          <input
            type="text"
            placeholder="Truck Number"
            value={newDriver.truckNumber}
            onChange={(e) => setNewDriver({ ...newDriver, truckNumber: e.target.value })}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={addDriver}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">All Drivers</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Vehicle</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d, i) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{d.name}</td>
                <td className="p-2">{d.phone}</td>
                <td className="p-2">{d.truckNumber || "N/A"}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      d.status === "available"
                        ? "bg-green-100 text-green-700"
                        : d.status === "on_delivery"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => updateStatus(d.id, d.status === "available" ? "inactive" : "available")}
                    className="text-blue-600 hover:underline"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deleteDriver(d.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder(prompt("Enter Order ID to assign"));
                      setSelectedDriver(d.id);
                      setAssignModal(true);
                    }}
                    className="text-green-600 hover:underline"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Assign Driver #{selectedDriver}
            </h3>
            <p className="text-gray-600 mb-3">
              Confirm assigning to Order ID: <b>{selectedOrder}</b>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setAssignModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={assignDriver}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
}
