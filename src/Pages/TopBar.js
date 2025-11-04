// Pages/Topbar.js
import React from "react";

const Topbar = ({ title }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null; // parse safely

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="font-medium">{user.user_name}</span>
          <img
            src={user.profile_image}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      )}
    </header>
  );
};

export default Topbar;