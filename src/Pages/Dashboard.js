// Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    total_drivers: 0,
    total_users: 0,
    total_orders: 0,
    daily_earnings: 0,
    weekly_earnings: 0,
    monthly_earnings: 0,
    yearly_earnings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://192.168.100.5:5363/v1/dashboard/stats");
        setStats(res.data.stats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Layout title="Dashboard">
        <p className="text-center py-10 text-gray-500">Loading dashboard...</p>
      </Layout>
    );
  }

  // Prepare chart data
  const chartData = [
    { name: "Daily", earnings: stats.daily_earnings },
    { name: "Weekly", earnings: stats.weekly_earnings },
    { name: "Monthly", earnings: stats.monthly_earnings },
    { name: "Yearly", earnings: stats.yearly_earnings },
  ];

  return (
    <Layout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Drivers</h2>
          <p className="text-2xl font-bold text-green-600">{stats.total_drivers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold text-green-600">{stats.total_users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold text-green-600">{stats.total_orders}</p>
        </div>
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Daily Earnings</h2>
          <p className="text-xl font-bold text-green-600">KES {stats.daily_earnings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Weekly Earnings</h2>
          <p className="text-xl font-bold text-green-600">KES {stats.weekly_earnings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Monthly Earnings</h2>
          <p className="text-xl font-bold text-green-600">KES {stats.monthly_earnings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Yearly Earnings</h2>
          <p className="text-xl font-bold text-green-600">KES {stats.yearly_earnings}</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="earnings" fill="#16A34A" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}

export default Dashboard;