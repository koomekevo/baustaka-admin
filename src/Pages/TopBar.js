// Pages/Topbar.js
import React from "react";
import { UserCircle } from "lucide-react";

const Topbar = ({ title }) => {
  const storedUser = localStorage.getItem("admin");
  const user = storedUser ? JSON.parse(storedUser) : null; // parse safely

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="font-medium">{user.name}</span>
          <UserCircle className="w-10 h-10 text-green-600" /> {/* 👈 icon instead of image */}
        </div>
      )}
    </header>
  );
};

export default Topbar;