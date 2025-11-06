// src/screens/admin/Payments.js
import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Layout from "./Layout";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("https://baustaka-backend.onrender.com/api/payments/all");
        const data = await res.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
     <Layout title="Riders">
    <div className="flex">


      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        <div className="p-6">
          {/* Payments Table */}
          <h2 className="text-2xl font-bold mb-4">Payments</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[500px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">Transaction ID</th>
                    <th className="p-2">Buyer</th>
                    <th className="p-2">Seller</th>
                    <th className="p-2">Amount (KES)</th>
                    <th className="p-2">Method</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="p-4 text-center">
                        Loading payments...
                      </td>
                    </tr>
                  ) : payments.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-4 text-center">
                        No payments found.
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-2">
                          {payment.transaction_reference || `TXN-${payment.id}`}
                        </td>
                        <td className="p-2">{payment.buyer_name}</td>
                        <td className="p-2">{payment.seller_name}</td>
                        <td className="p-2 font-semibold">
                          {parseFloat(payment.amount).toFixed(2)}
                        </td>
                        <td className="p-2">{payment.method}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-white text-xs font-medium
                              ${
                                payment.status === "success"
                                  ? "bg-green-600"
                                  : payment.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-600"
                              }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="p-2">
                          {payment.paid_at
                            ? new Date(payment.paid_at).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="p-2">
                          <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Payments;