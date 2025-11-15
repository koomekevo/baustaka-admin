import React, { useState } from "react";
import axios from "axios";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("superadmin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // 1️⃣ Create Firebase User (Front-end)
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Optional: Update displayName
      await updateProfile(userCred.user, {
        displayName: fullName,
      });

      // 2️⃣ Get Firebase ID Token
      const idToken = await userCred.user.getIdToken();

      // 3️⃣ Send to backend to save admin user in DB
      // const response = await axios.post("http://localhost:5363/v1/admin/register", {
      //   idToken,
      //   fullName,
      //   phoneNumber,
      //   role,
      // });

      setSuccess("Admin registered successfully!");
      setEmail("");
      setPassword("");
      setFullName("");
      setPhoneNumber("");
      setRole("superadmin");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-green-600 p-6">
      <div className="bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-green-800 text-center mb-2">
          Baustaka Admin
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Create a new admin account
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm border border-red-200">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm border border-green-200">
            {success}
          </p>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="admin@baustaka.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="+254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="superadmin">Super Admin</option>
              <option value="manager">Manager</option>
              <option value="support">Support</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 transition-all duration-200"
          >
            Register Admin
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-5">
          © {new Date().getFullYear()} Baustaka Marketplace
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
