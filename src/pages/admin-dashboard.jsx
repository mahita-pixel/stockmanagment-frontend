import { useEffect, useState } from "react";
import { getUsers, getProducts } from "../Api/api";
import { FaUsers, FaBoxOpen, FaChartLine, FaDollarSign } from "react-icons/fa";
import UserManagement from "../components/UserManagement";
import ProductManagement from "../components/ProductManagement";
import StockReport from "./StockReport";
import AdminRoute from "../routes/AdminRoute";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (activePage === "users") loadUsers();
    if (activePage === "products") loadProducts();
  }, [activePage]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res?.data || res || []);
  };

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res?.data || res || []);
  };

  const stats = [
    { title: "Users", value: users.length, icon: <FaUsers /> },
    { title: "Products", value: products.length, icon: <FaBoxOpen /> },
    { title: "Reports", value: 12, icon: <FaChartLine /> },
    { title: "Revenue", value: "$24,500", icon: <FaDollarSign /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        {["dashboard", "users", "products", "reports"].map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`mb-2 w-full text-left px-4 py-2 rounded font-medium transition ${
              activePage === page ? "bg-cyan-700" : "hover:bg-cyan-800"
            }`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activePage === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 hover:scale-105 transform transition">
                  <div className="text-4xl text-cyan-600">{s.icon}</div>
                  <div>
                    <p className="text-gray-500">{s.title}</p>
                    <p className="font-bold text-xl">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === "users" && <p className="text-gray-600"><UserManagement/></p>}
        {activePage === "products" && <p className="text-gray-600"><ProductManagement/></p>}
        {activePage === "reports" && <p className="text-gray-600"><StockReport/></p>}
        {activePage === "" && <p className="text-gray-600"><StockReport/></p>}

      </main>
    </div>
  );
}
