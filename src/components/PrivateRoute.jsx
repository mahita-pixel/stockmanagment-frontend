// src/components/PrivateRoute.js
// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// allowedRoles: array of roles that can access this route
function PrivateRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Role-based check
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/user-dashboard" replace />; // or /unauthorized page
  }

  return children;
}

export default PrivateRoute;