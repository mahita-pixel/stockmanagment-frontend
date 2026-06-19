// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import ProductManagement from './components/ProductManagement.jsx';
import LandingPage from './pages/LandingPage.jsx';
import UserList from './pages/UserList.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/register.jsx';
import Dashboard from "./pages/user-dashboard.jsx";
import AdminDashboard from "./pages/admin-dashboard.jsx";
import StockReport from './pages/StockReport.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AddItem from "./pages/AddItem";

function Home() {
  return (
    <div>
      <ProductManagement />
      <UserList />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
master
        {/* Landing / Home */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-item" element={<AddItem />} />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "superadmin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Stock Report (Admin/User) */}
        <Route
          path="/StockReport"
          element={
            <PrivateRoute allowedRoles={["user", "admin", "superadmin"]}>
              <StockReport />
            </PrivateRoute>
          }
        />

        {/* Fallback for unmatched routes */}

      </Routes>
    </BrowserRouter>
  );
}