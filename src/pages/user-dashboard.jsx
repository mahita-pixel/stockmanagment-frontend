// src/pages/user-dashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaChartLine,
  FaWarehouse,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

import AddItem from "./AddItem";
import { getProducts } from "../Api/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= LOAD PRODUCTS =================
  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts();

      const data =
        res?.data?.products ||
        res?.data ||
        [];

      setProducts(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= AUTH CHECK =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadProducts();
  }, [navigate]);

  const safePage = activePage || "dashboard";

  // ================= STATS =================
  const stats = [
    {
      title: "Inventory",
      value: products.length,
      icon: <FaWarehouse />,
    },
    {
      title: "Orders",
      value: 34,
      icon: <FaShoppingCart />,
    },
    {
      title: "Reports",
      value: 12,
      icon: <FaChartLine />,
    },
    {
      title: "Products",
      value: products.length,
      icon: <FaBoxOpen />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-cyan-900 text-white p-6 flex flex-col">

        <h1 className="text-2xl font-bold mb-6">
          User Panel
        </h1>

        {["dashboard", "inventory", "orders", "reports"].map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`mb-2 w-full text-left px-4 py-2 rounded font-medium transition ${
              safePage === page ? "bg-cyan-700" : "hover:bg-cyan-800"
            }`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-6">

        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold text-gray-800">
            {safePage.charAt(0).toUpperCase() + safePage.slice(1)}
          </h2>

          <div className="flex gap-4">

            {/* ADD ITEM */}
            <button
              onClick={() => setActivePage("add-item")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
            >
              <FaPlus />
              Add Item
            </button>

            {/* PDF DOWNLOAD */}
            <button
              onClick={() =>
                window.open(
                  "http://localhost:5000/reports/inventory/pdf",
                  "_blank"
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Download PDF
            </button>

            {/* LOGOUT */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </div>

        {/* ================= DASHBOARD ================= */}
        {safePage === "dashboard" && (
          <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 hover:scale-105 transform transition"
                >
                  <div className="text-4xl text-cyan-600">
                    {s.icon}
                  </div>

                  <div>
                    <p className="text-gray-500">{s.title}</p>
                    <p className="font-bold text-xl">{s.value}</p>
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* ================= INVENTORY ================= */}
        {safePage === "inventory" && (
          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-3xl font-bold mb-6">
              Inventory
            </h2>

            {loading ? (
              <p>Loading products...</p>
            ) : products.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {product.name ||
                       product.productName ||
                       product.title ||
                       "Unnamed Product"}
                    </h3>

                    <p className="text-gray-600">
                      Quantity: {product.quantity}
                    </p>

                    <p className="text-gray-600">
                      Price: ${product.price}
                    </p>
                  </div>
                ))}

              </div>

            ) : (
              <p className="text-gray-500">No products found.</p>
            )}

          </div>
        )}

        {/* ================= ORDERS ================= */}
        {safePage === "orders" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-3xl font-bold mb-4">Orders</h2>
            <p className="text-gray-600">Orders will appear here.</p>
          </div>
        )}

        {/* ================= REPORTS ================= */}
        {safePage === "reports" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-3xl font-bold mb-4">Reports</h2>
            <p className="text-gray-600">Reports will appear here.</p>
          </div>
        )}

        {/* ================= ADD ITEM ================= */}
        {safePage === "add-item" && (
          <div className="bg-white p-6 rounded-2xl shadow">

            <AddItem
              refreshProducts={loadProducts}
              goToInventory={() => setActivePage("inventory")}
            />

          </div>
        )}

      </main>
    </div>
  );
}