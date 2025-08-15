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
    
      <div class="bg-teal-500">
  <div class="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100">

  
    <div class="flex w-full max-w-screen-xl bg-white shadow-xl rounded-lg overflow-hidden">

      <div class="w-64 bg-gradient-to-b from-teal-500 to-blue-700 text-white p-6">
        <h2 class="text-2xl font-bold mb-8">Stock Manager</h2>
       
<nav class="space-y-4">
  <a href="#" class="block py-2.5 px-4 rounded-lg text-white transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg">
    Dashboard
  </a>
  <a href="#" class="block py-2.5 px-4 rounded-lg text-white transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg">
    Inventory
  </a>
  <a href="#" class="block py-2.5 px-4 rounded-lg text-white transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg">
    Orders
  </a>
  <a href="#" class="block py-2.5 px-4 rounded-lg text-white transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg">
    Reports
  </a>
</nav>

      </div>

      <div class="flex-1 p-8">

        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-semibold text-gray-800">Dashboard</h1>
          <div class="flex items-center space-x-4">
            <button class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">Add Item</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">Logout</button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 class="text-xl font-semibold text-gray-700">Total Stock</h3>
            <p class="text-3xl font-bold text-gray-900">1,234</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 class="text-xl font-semibold text-gray-700">Low Stock Items</h3>
            <p class="text-3xl font-bold text-gray-900">12</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 class="text-xl font-semibold text-gray-700">Orders Today</h3>
            <p class="text-3xl font-bold text-gray-900">56</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 class="text-xl font-semibold text-gray-700">restocked items </h3>
            <p class="text-3xl font-bold text-gray-900">21</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
          <ul class="space-y-4">
            <li class="flex justify-between items-center border-b pb-4">
              <div class="flex items-center space-x-2">
                <span class="font-semibold text-gray-800">Added 50 units of Item A</span>
                <span class="text-sm text-gray-500">2 hours ago</span>
              </div>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">View</button>
            </li>
            <li class="flex justify-between items-center border-b pb-4">
              <div class="flex items-center space-x-2">
                <span class="font-semibold text-gray-800">Sold 30 units of Item B</span>
                <span class="text-sm text-gray-500">5 hours ago</span>
              </div>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">View</button>
            </li>
            <li class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <span class="font-semibold text-gray-800">Restocked 100 units of Item C</span>
                <span class="text-sm text-gray-500">1 day ago</span>
              </div>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">View</button>
            </li>
          </ul>
        </div>

      </div>

    </div>

  </div>
</div>
      {/* You can also fetch protected API data here */}
    </div>
  );
}
