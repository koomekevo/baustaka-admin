import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Listings from './Pages/Listings';
import Messages from './Pages/Messages';
import Orders from './Pages/Orders';
import Settings from './Pages/Settings';
import Signin from './Pages/Signin';
import Users from './Pages/Users';
import Payments from './Pages/Payments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />

        
      </Routes>
    </Router>
  );
}

export default App;