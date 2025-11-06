import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://baustaka-backend.onrender.com/api/users"); // ✅ adjust to your endpoint
      setUsers(res.data.users || res.data.data || []);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://baustaka-backend.onrender.com/api/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      alert("✅ User deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  if (loading)
    return (
      <Layout title="Users">
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading users...</p>
      </div>
      </Layout>
    );

  return (
    <Layout title="Users">
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-3 text-sm text-gray-700">{i + 1}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-800">
                    {u.name || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{u.email}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{u.phone}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{u.locationName || "—"}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </Layout>
  );
}
