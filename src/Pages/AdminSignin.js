// import React, { useState } from "react";
import axios from "axios"; // make sure to install axios
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const AdminSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleSignin = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const response = await axios.post("http://localhost:5363/v1/admin/login", {
  //       email,
  //       password,
  //     });

  //     // Save the custom token from backend
  //     localStorage.setItem("adminToken", response.data.customToken);

  //     // Optionally save user info
  //     localStorage.setItem("adminUser", JSON.stringify(response.data.user));

  //     navigate("/dashboard");
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message);
  //   }
  // };


  const handleSignin = async (e) => {
  e.preventDefault();

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCred.user.getIdToken();

    // Save ID token
    localStorage.setItem("adminIdToken", idToken);
    alert(idToken);

    navigate("/dashboard");
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-green-600 p-6">
      <div className="bg-white/95 backdrop-blur-2xl shadow-xl rounded-2xl p-10 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-green-800 text-center mb-2">
          Baus Taka Marketplace Admin
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign in to your dashboard
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm border border-red-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="admin@baustaka.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
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
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-5">
          © {new Date().getFullYear()} Baustaka Marketplace
        </p>
      </div>
    </div>
  );
};

export default AdminSignin;
