import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// ⚠️ Case matters on many systems. Match the filenames exactly:
import ProductList from './components/productList';   // file is productList.jsx in your tree
import UserList from './pages/UserList.jsx';     // file is UserList.jsx
import Login from './pages/Login.jsx';                // file is Login.jsx
import Register from './pages/register.jsx';          // file is Register.jsx
import Dashboard from "./pages/dashboard"; // ✅ Make sure this file exists
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
  return (
    <div>
      <ProductList />
      <UserList />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default to /login; change to <Home /> if you prefer */}
       <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Optional 404 fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
