// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // 🚫 If no token, redirect to login
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {/* You can also fetch protected API data here */}
    </div>
  );
}
