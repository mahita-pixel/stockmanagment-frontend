import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser, getProducts } from "../Api/api";
import { FaUsers, FaBoxOpen, FaChartLine, FaDollarSign } from "react-icons/fa";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  // Users state
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Products state
  const [products, setProducts] = useState([]);

  // Counters for animated dashboard cards
  const [animateUsers, setAnimateUsers] = useState(0);
  const [animateProducts, setAnimateProducts] = useState(0);

  // Load data based on active page
  useEffect(() => {
    if (activePage === "users") loadUsers();
    if (activePage === "products") loadProducts();
  }, [activePage]);

useEffect(() => {
  if (activePage === "dashboard") {
    let u = 0;
    let p = 0;

    // Reset counters first
    setAnimateUsers(0);
    setAnimateProducts(0);

    const interval = setInterval(() => {
      if (u < users.length) setAnimateUsers(prev => prev + 1);
      if (p < products.length) setAnimateProducts(prev => prev + 1);
      if (u >= users.length && p >= products.length) clearInterval(interval);
      u++; p++;
    }, 20);

    return () => clearInterval(interval); // Cleanup to prevent multiple intervals
  }
}, [activePage, users.length, products.length]);



  // API functions
  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res?.data || res || []);
    } catch (err) { console.error(err); }
  };

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res?.data || res || []);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        if (!formData.password) delete formData.password;
        await updateUser(editingUser._id, formData);
        setUsers(prev => prev.map(u => u._id === editingUser._id ? { ...u, ...formData } : u));
      } else {
        const created = await addUser(formData);
        setUsers(prev => [...prev, created?.data || created]);
      }
      setFormData({ name: "", email: "", password: "" });
      setEditingUser(null);
      setShowForm(false);
    } catch (err) { alert("Error saving user: " + err.message); }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, password: "" });
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteUser(user._id);
        setUsers(prev => prev.filter(u => u._id !== user._id));
      } catch (err) { alert("Error deleting user: " + err.message); }
    }
  };

  // Dashboard stats
  const stats = [
    { title: "Total Users", value: animateUsers, icon: <FaUsers />, gradient: "from-cyan-500 to-blue-500" },
    { title: "Total Products", value: animateProducts, icon: <FaBoxOpen />, gradient: "from-teal-400 to-green-400" },
    { title: "Active Reports", value: 12, icon: <FaChartLine />, gradient: "from-yellow-400 to-orange-400" },
    { title: "Revenue", value: "$24,500", icon: <FaDollarSign />, gradient: "from-green-400 to-teal-600" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-900 text-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-cyan-800">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {["dashboard", "users", "products", "reports"].map(page => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`block w-full text-left py-2 px-4 rounded font-medium transition-colors duration-200 ${
                activePage === page ? "bg-cyan-700 text-white" : "hover:bg-cyan-800 text-cyan-100"
              }`}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Page */}
        {activePage === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex items-center p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 bg-gradient-to-r ${stat.gradient} text-white`}
                >
                  <div className="text-4xl mr-4">{stat.icon}</div>
                  <div>
                    <p className="text-gray-200">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Page */}
        {activePage === "users" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-cyan-900">Manage Users</h2>
              <button
                onClick={() => setShowForm(v => !v)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full shadow transition transform hover:scale-105"
              >
                {showForm ? "Cancel" : "Add User"}
              </button>
            </div>

            {showForm && (
              <form
                className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto transition-all duration-300"
                onSubmit={handleSubmit}
              >
                <h3 className="text-2xl font-semibold text-cyan-900 mb-4">
                  {editingUser ? "Edit User" : "Add New User"}
                </h3>
                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                  <input
                    type="password"
                    placeholder={editingUser ? "Leave blank to keep password" : "Password"}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                    value={formData.password}
                    onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                    required={!editingUser}
                  />
                  <button
                    type="submit"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-full shadow transition transform hover:scale-105"
                  >
                    {editingUser ? "Update User" : "Add User"}
                  </button>
                </div>
              </form>
            )}

            <div className="grid gap-4">
              {users.map(u => (
                <div
                  key={u._id}
                  className="bg-white rounded-2xl shadow p-4 flex justify-between items-center transition hover:shadow-xl hover:scale-[1.01]"
                >
                  <div>
                    <p className="font-semibold text-cyan-900">{u.name}</p>
                    <p className="text-gray-600">{u.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-1.5 rounded-full shadow transition transform hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full shadow transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Page */}
        {activePage === "products" && (
          <div>
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Products</h2>
            <div className="grid gap-4">
              {products.map(p => (
                <div key={p._id} className="bg-white rounded-2xl shadow p-4 flex justify-between items-center border-l-4 border-teal-500">
                  <div>
                    <p className="font-semibold text-teal-700">{p.name}</p>
                    <p className="text-gray-600">Price: ${p.price}</p>
                    <p className="text-gray-600">Stock: {p.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Page */}
        {activePage === "reports" && (
          <div>
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Reports</h2>
            <div className="bg-white shadow rounded-2xl p-6 border-l-4 border-yellow-500">
              <p className="text-gray-600">Charts and analytics will go here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
