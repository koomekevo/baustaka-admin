// src/screens/admin/Settings.js
import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { User, Mail, Lock, Moon, Bell } from "lucide-react";
import Layout from "./Layout";

const Settings = () => {
  return (
    <Layout title="Settings">
    <div className="flex">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Settings Sections */}
        <div className="p-6 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Profile Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  defaultValue="Admin"
                  placeholder="Admin Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  defaultValue="admin@example.com"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save Profile
            </button>
          </div>

          {/* System Preferences */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-600" />
              System Preferences
            </h2>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Dark Mode</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Notifications</label>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
          </div>

          {/* Security */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" />
              Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Settings;