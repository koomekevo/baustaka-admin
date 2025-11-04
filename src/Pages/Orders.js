import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [showModal, setShowModal] = useState(false);

  const API = "http://192.168.100.5:4000/api/drivers";

  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/undelivered-orders`);
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(`${API}`);
      setDrivers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  const assignDriver = async () => {
    try {
      await axios.post(`${API}/assign-order`, {
        orderId: selectedOrder.id,
        driverId: selectedDriver,
      });
      setShowModal(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      console.error("Error assigning driver:", err);
    }
  };

  return (
    <Layout title="Orders">
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pending Orders</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Buyer</th>
              <th className="p-2 text-left">Total Price</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Assigned Driver</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{order.Buyer?.name || "Unknown"}</td>
                <td className="p-2">Ksh. {order.totalPrice}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.deliveryStatus === "assigned"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.deliveryStatus === "on_route"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.deliveryStatus}
                  </span>
                </td>
                <td className="p-2">
                  {order.Driver ? order.Driver.name : <i>Not assigned</i>}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Assign Driver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No pending or undelivered orders
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Assign Driver for Order #{selectedOrder?.id}
            </h3>

            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="border p-2 w-full rounded mb-4"
            >
              <option value="">Select Driver</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.status})
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={assignDriver}
                disabled={!selectedDriver}
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
